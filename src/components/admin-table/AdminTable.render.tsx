import { useEffect, useRef, useState } from "react";
import {
  AddButton,
  FilterButton,
  FilterContainer,
  StyledTable,
  TableContainer,
  TableRow,
  PaginationContainer,
  PageButton,
} from "./AdminTable.style";
import EditDeleteItem from "../edit-delete-item";
import FilterIcon from "../../assets/filter.svg";
import { getBackgroundColor } from "@/utils";
import Chart from "../chart";
import FilterModal from "../filter-modal";
import { useRouter } from "next/navigation";
import PieChart from "../pie-chart";
import TopWritersChart from "../top-writers-chart";
import axios from "axios";
import { Movie, MovieApiResponse } from "@/constants";
import { saveDataToLocalStorage } from "@/DataCaching";
import { useStatsSocket } from "@/DataBroadcasting";
import InfiniteScroll from "react-infinite-scroll-component";
import FileUpload from "../file-upload";

interface EditableTableProps {
  columns: (keyof Movie)[];
}

const AdminTable = ({ columns }: EditableTableProps) => {
  const [data, setData] = useState<Movie[]>([]);
  const [tableData, setTableData] = useState<Movie[]>([]);
  const [visibleRows, setVisibleRows] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 10;
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [ascending, setAscending] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<keyof Movie>("title");
  const [selectedSortColumn, setSelectedSortColumn] =
    useState<keyof Movie>("title");
  const [filterText, setFilterText] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [stats, setStats] = useState({ max: 0, min: 10, average: 0 });
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [offlineIssue, setOfflineIssue] = useState("");
  const router = useRouter();
  const { histogramData, pieData, topWriters } = useStatsSocket(isOnline);

  const checkServerStatus = async () => {
    try {
      const response = await axios.get("http://localhost:5249/heartbeat");

      if (response.status === 200) {
        console.log("Server is up and running!");
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
  useEffect(() => {
    const intervalId = setInterval(() => {
      checkServerStatus();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchData = async () => {
    const requestBody = {
      onlyCount: false,
      paging: {
        pageSize: rowsPerPage,
        pageNumber: currentPage,
      },
      filtering: [
        {
          fieldToFilterBy: selectedColumn,
          value: filterText,
          operation: "in",
        },
      ],
      sorting: {
        fieldToSortBy: selectedSortColumn,
        order: ascending ? "asc" : "desc",
      },
    };

    try {
      const response = await axios.post<MovieApiResponse>(
        "http://localhost:5249/Movies/filter",
        requestBody
      );

      const response2 = await axios.get(
        "http://localhost:5249/Movies/get-averages"
      );

      setStats(response2.data);

      console.log(response2);

      const movies = response.data.results;
      setTotalPages(Math.ceil(response.data.numberFound / rowsPerPage));
      if (currentPage === 1) {
        setData(movies);
        setTableData(movies);
      } else {
        setData((prev) => [...prev, ...movies]);
        setTableData((prev) => [...prev, ...movies]);
      }
    } catch (err) {
      console.error("axios error:", err);
    }
  };

  useEffect(() => {
    const fetchDataIfConnected = async () => {
      await checkServerStatus();

      if (isOnline == null) return;

      if (isOnline) {
        await fetchData();
        console.log(isOnline);
        console.log(localStorage.getItem("page1"));

        if (!localStorage.getItem("page1")) {
          saveDataToLocalStorage(
            selectedColumn,
            filterText,
            ascending,
            rowsPerPage
          );
        }
      } else {
        const storedData = localStorage.getItem("page" + currentPage);

        if (storedData) {
          const parsedData: Movie[] = JSON.parse(storedData);
          if (currentPage === 1) {
            setData(parsedData);
            setTableData(parsedData);
          } else {
            setData((prev) => [...prev, ...parsedData]);
            setTableData((prev) => [...prev, ...parsedData]);
          }
          setTotalPages(JSON.parse(localStorage.getItem("totalPages")!));
          setStats(JSON.parse(localStorage.getItem("stats")!));
        }
      }
    };

    fetchDataIfConnected();
  }, [filterText, ascending, selectedColumn, currentPage, isOnline]);

  useEffect(() => {
    setVisibleRows(
      [...data].filter((a) =>
        a[selectedColumn]
          ?.toString()
          .toLowerCase()
          .includes(filterText.toLowerCase())
      )
    );
  }, [tableData, data]);

  const sortData = (index: keyof Movie) => {
    setSelectedSortColumn(index);
    setAscending(!ascending);
  };

  const filterData = () => {
    setCurrentPage(1);
    setIsFilterModalOpen(false);
  };

  return (
    <>
      {!isOnline && <p>OFFLINE MODE</p>}
      {offlineIssue == "network" && <p>NETWORK ISSUES</p>}
      {offlineIssue == "server" && <p>SERVER ISSUES</p>}
      <FilterContainer>
        <FilterButton onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}>
          <FilterIcon />
        </FilterButton>
      </FilterContainer>
      <TableContainer id="scrollable-table-container" ref={tableContainerRef}>
        <InfiniteScroll
          dataLength={data.length}
          style={{ width: "100%" }}
          next={() => {
            console.log("HEI THIS GOT TRIGGERED");
            setCurrentPage((prev) => prev + 1);
          }}
          hasMore={currentPage < totalPages}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more items</p>}
          scrollableTarget="scrollable-table-container"
        >
          <StyledTable>
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    style={{ textAlign: index === 0 ? "left" : "center" }}
                    onClick={() => sortData(col)}
                  >
                    {col}
                  </th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <td key={col}>
                      <p
                        style={{
                          textAlign: colIndex === 0 ? "left" : "center",
                          backgroundColor:
                            col.toLowerCase() === "rating"
                              ? getBackgroundColor(row[col] as number, stats)
                              : "transparent",
                          borderRadius: "5px",
                        }}
                      >
                        {row[col]}
                      </p>
                    </td>
                  ))}
                  <td>
                    <EditDeleteItem
                      index={row.id}
                      refresh={() => {
                        fetchData();
                      }}
                    />
                  </td>
                </TableRow>
              ))}
            </tbody>
          </StyledTable>
        </InfiniteScroll>

        {isFilterModalOpen && (
          <FilterModal
            selectedColumn={selectedColumn}
            setSelectedColumn={setSelectedColumn}
            filterText={filterText}
            setFilterText={setFilterText}
            filterData={filterData}
          />
        )}
      </TableContainer>

      <AddButton onClick={() => router.push("/add-movie")}>Add new</AddButton>
      <Chart data={histogramData} />
      <PieChart data={pieData} />
      <TopWritersChart data={topWriters} />

      <FileUpload />
    </>
  );
};

export default AdminTable;
