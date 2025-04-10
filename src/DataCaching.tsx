import axios from "axios";
import { Movie, MovieApiResponse } from "./constants";

export const saveDataToLocalStorage = async (
  selectedColumn: keyof Movie,
  filterText: string,
  ascending: boolean,
  rowsPerPage: number
) => {
  let currentPage = 1;
  let totalPages = 1;

  localStorage.clear();

  const response2 = await axios.get(
    "http://localhost:5249/Movies/get-averages"
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
        "http://localhost:5249/Movies/filter",
        requestBody
      );
      const movies = response.data.results;
      totalPages = Math.ceil(response.data.numberFound / rowsPerPage);

      localStorage.setItem(`page${page}`, JSON.stringify(movies));
      console.log(`Saved page ${page} data to localStorage`);

      if (page < totalPages) {
        fetchDataForPage(page + 1);
      }
    } catch (error) {
      console.error("Error fetching data for page", page, error);
    }
    localStorage.setItem("totalPages", JSON.stringify(totalPages));
  };

  fetchDataForPage(currentPage);
};
