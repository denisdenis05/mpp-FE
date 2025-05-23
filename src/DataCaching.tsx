import axios from "axios";
import { Movie, MovieApiResponse } from "./constants";

type OfflineChangeType = "add" | "edit" | "delete";

interface OfflineChange {
  type: OfflineChangeType;
  payload: any; // Movie or { id: number } depending on type
}

export const checkServerStatus = async (
  setIsOnline: any,
  setOfflineIssue: any
) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/heartbeat"
    );

    if (response.status === 200) {
      console.log("Server is up and running!");
      await applyOfflineChanges();

      setIsOnline(true);
      setOfflineIssue("");

      return true;
    } else {
      console.log("Server returned a non-200 response:", response.status);
      return false;
    }
  } catch (error: any) {
    setIsOnline(false);

    if (!error.response) {
      if (error.code === "ECONNABORTED") {
        setOfflineIssue("network");
        console.log(
          "Request timed out. Possibly server overload or slow network."
        );
      } else if (error.message.includes("Network Error")) {
        setOfflineIssue("network");
        console.log("Network is unreachable or DNS resolution failed.");
      } else {
        setOfflineIssue("network");
        console.log("Unknown network/server access issue:", error.message);
      }
    } else if (error.response.status >= 500) {
      setOfflineIssue("server");
      console.log(
        "Server is down or crashed (5xx error):",
        error.response.status
      );
    } else {
      setOfflineIssue("server");
      console.log("Server responded with an error:", error.response.status);
    }

    return false;
  }
};

export const saveOfflineChange = (change: OfflineChange) => {
  const existing = JSON.parse(localStorage.getItem("offlineChanges") || "[]");
  existing.push(change);
  localStorage.setItem("offlineChanges", JSON.stringify(existing));
};

export const getOfflineChanges = (): OfflineChange[] => {
  return JSON.parse(localStorage.getItem("offlineChanges") || "[]");
};

export const clearOfflineChanges = () => {
  localStorage.removeItem("offlineChanges");
};

export const applyOfflineChanges = async () => {
  const stored = localStorage.getItem("offlineChanges");
  if (!stored) return;
  console.log("OFFLINE. CHECKING CHANGES");

  const changes: OfflineChange[] = JSON.parse(stored);
  const failedChanges: OfflineChange[] = [];

  for (const change of changes) {
    try {
      if (change.type === "edit") {
        await axios.put(
          process.env.NEXT_PUBLIC_API_URL + `/Movies/edit`,
          change.payload
        );
      } else if (change.type === "delete") {
        console.log("DOING DELETE.");

        await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/Movies/delete`, {
          data: change.payload,
        });
      } else if (change.type === "add") {
        await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "/Movies/add",
          change.payload
        );
      }
    } catch (err) {
      console.error("Failed to sync change:", change, err);
      failedChanges.push(change);
    }
  }

  if (failedChanges.length > 0) {
    localStorage.setItem("offlineChanges", JSON.stringify(failedChanges));
  } else {
    localStorage.removeItem("offlineChanges");
  }
};

export const saveDataToLocalStorage = async (
  selectedColumn: keyof Movie,
  filterText: string,
  ascending: boolean,
  rowsPerPage: number,
  getToken: any
) => {
  let currentPage = 1;
  let totalPages = 1;
  const maxPages = 10;

  localStorage.clear();

  const response2 = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/Movies/get-averages",
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  localStorage.setItem("stats", JSON.stringify(response2.data));

  const fetchDataForPage = async (page: number) => {
    const requestBody = {
      onlyCount: false,
      paging: {
        pageSize: rowsPerPage,
        pageNumber: page,
      },
      filtering: [
        {
          fieldToFilterBy: selectedColumn,
          value: filterText,
          operation: "in",
        },
      ],
      sorting: {
        fieldToSortBy: selectedColumn,
        order: ascending ? "asc" : "desc",
      },
    };

    try {
      const response = await axios.post<MovieApiResponse>(
        process.env.NEXT_PUBLIC_API_URL + "/Movies/filter",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      const movies = response.data.results;
      totalPages = Math.ceil(response.data.numberFound / rowsPerPage);

      localStorage.setItem(`page${page}`, JSON.stringify(movies));
      console.log(`Saved page ${page} data to localStorage`);

      if (page < totalPages && page < maxPages) {
        fetchDataForPage(page + 1);
      }
    } catch (error) {
      console.error("Error fetching data for page", page, error);
    }
    localStorage.setItem("totalPages", JSON.stringify(totalPages));
  };

  fetchDataForPage(currentPage);
};
