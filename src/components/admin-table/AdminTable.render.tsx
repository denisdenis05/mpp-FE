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
import EndorsementsModal from "../endorsement-modal";
import { useRouter } from "next/navigation";
import PieChart from "../pie-chart";
import TopWritersChart from "../top-writers-chart";
import axios from "axios";
import { Movie, MovieApiResponse } from "@/constants";
import { checkServerStatus, saveDataToLocalStorage } from "@/DataCaching";
import { useStatsSocket } from "@/DataBroadcasting";
import InfiniteScroll from "react-infinite-scroll-component";
import FileUpload from "../file-upload";
import { useData } from "@/DataContext";

interface EditableTableProps {
  columns: (keyof Movie)[];
}

interface Endorsement {
  endorsementId: number;
  endorser: number;
  date: string;
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
  const { getToken } = useData();
  const [attackTriggered, setAttackTriggered] = useState(false);

  const [isEndorsementsModalOpen, setIsEndorsementsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [endorsements, setEndorsements] = useState<Endorsement[]>([]);
  const [loadingEndorsements, setLoadingEndorsements] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkServerStatus(setIsOnline, setOfflineIssue);
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
        process.env.NEXT_PUBLIC_API_URL + "/Movies/filter",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const response2 = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/Movies/get-averages",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      setStats(response2.data);

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
      console.log("ATTACK TRIGGERED");
      setAttackTriggered(true);
      return;
    }
  };

  const fetchEndorsements = async (movieId: number) => {
    setLoadingEndorsements(true);
    try {
      const response = await axios.get<Endorsement[]>(
        process.env.NEXT_PUBLIC_API_URL +
          `/Movies/get-endorsement?movieId=${movieId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setEndorsements(response.data);
    } catch (err) {
      console.error("Error fetching endorsements:", err);
      setEndorsements([]);
    } finally {
      setLoadingEndorsements(false);
    }
  };

  // Handler for row click to open endorsements modal
  const handleRowClick = (movie: Movie) => {
    setSelectedMovie(movie);
    fetchEndorsements(movie.id);
    setIsEndorsementsModalOpen(true);
  };

  useEffect(() => {
    const fetchDataIfConnected = async () => {
      await checkServerStatus(setIsOnline, setOfflineIssue);

      if (isOnline == null) return;

      if (isOnline) {
        await fetchData();

        if (!localStorage.getItem("page1")) {
          saveDataToLocalStorage(
            selectedColumn,
            filterText,
            ascending,
            rowsPerPage,
            getToken
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
      {attackTriggered && <p>ATTACK TRIGGERED. YOU ARE BEING RATE LIMITED</p>}
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
                <TableRow
                  key={rowIndex}
                  onClick={() => handleRowClick(row)}
                  style={{ cursor: "pointer" }}
                >
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
                  <td onClick={(e) => e.stopPropagation()}>
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

        {isEndorsementsModalOpen && selectedMovie && (
          <EndorsementsModal
            isOpen={isEndorsementsModalOpen}
            onClose={() => setIsEndorsementsModalOpen(false)}
            movie={selectedMovie}
            endorsements={endorsements}
            isLoading={loadingEndorsements}
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
