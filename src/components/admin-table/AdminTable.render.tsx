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

interface EditableTableProps {
  columns: (keyof Movie)[];
}

const AdminTable = ({ columns }: EditableTableProps) => {
  const [data, setData] = useState<Movie[]>([]);
  const [tableData, setTableData] = useState<Movie[]>([]);
  const [visibleRows, setVisibleRows] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 5;
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [ascending, setAscending] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<keyof Movie>("title");
  const [selectedSortColumn, setSelectedSortColumn] =
    useState<keyof Movie>("title");
  const [filterText, setFilterText] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [stats, setStats] = useState({ max: 0, min: 10, average: 0 });
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const router = useRouter();
  const { histogramData, pieData, topWriters } = useStatsSocket();

  const checkServerStatus = async () => {
    try {
      const response = await axios.get("http://localhost:5249/heartbeat");

      if (response.status === 200) {
        console.log("Server is up and running!");
        setIsOnline(true);
        return true;
      } else {
        console.log("Server returned a non-200 response:", response.status);
        return false;
      }
    } catch (error: any) {
      console.log("here");
      setIsOnline(false);
      if (!error.response) {
        console.log("Network issue or server down, unable to reach server");
      } else if (error.response.status >= 500) {
        console.log("Server is down (5xx status code)", error.response.status);
      } else {
        console.log("Request failed with status:", error.response.status);
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
      setData(movies);
      setTableData(movies);
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
          setData(parsedData);
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
      <FilterContainer>
        <FilterButton onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}>
          <FilterIcon />
        </FilterButton>
      </FilterContainer>
      <TableContainer ref={tableContainerRef}>
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

      <PaginationContainer>
        <PageButton
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </PageButton>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <PageButton
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </PageButton>
      </PaginationContainer>

      <AddButton onClick={() => router.push("/add-movie")}>Add new</AddButton>
      <Chart data={histogramData} />
      <PieChart data={pieData} />
      <TopWritersChart data={topWriters} />
    </>
  );
};

export default AdminTable;
