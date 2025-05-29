import FilterModal from "@/components/filter-modal";
import { checkServerStatus } from "@/DataCaching";
import { useData } from "@/DataContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, Key } from "react";
import FilterIcon from "../../assets/filter.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  FilterContainer,
  FilterButton,
  TableContainer,
  StyledTable,
  TableRow,
  DashboardContainer,
  MainContainer,
} from "./AdminCachePage.style";
import Navbar from "@/components/navbar";

interface EventLog {
  eventCacheId: number;
  token: string;
  action: string;
  time: string;
}

interface MonitoredUser {
  monitoredUserId: number;
  token: string;
  critical: boolean;
}

interface EventLogApiResponse {
  results: EventLog[];
  numberFound: number;
}

const AdminCachePage = () => {
  const [data, setData] = useState<EventLog[]>([]);
  const [monitorData, setMonitorData] = useState<MonitoredUser[]>([]);
  const [visibleRows, setVisibleRows] = useState<EventLog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 10;
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [ascending, setAscending] = useState(false);
  const [selectedColumn, setSelectedColumn] =
    useState<keyof EventLog>("action");
  const [selectedSortColumn, setSelectedSortColumn] =
    useState<keyof EventLog>("eventCacheId");
  const [filterText, setFilterText] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [offlineIssue, setOfflineIssue] = useState("");
  const router = useRouter();
  const { getToken } = useData();
  const columns: (keyof EventLog)[] = [
    "eventCacheId",
    "token",
    "action",
    "time",
  ];
  const monitoredUsersColumns: (keyof MonitoredUser)[] = [
    "monitoredUserId",
    "token",
    "critical",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkServerStatus(setIsOnline, setOfflineIssue, getToken);
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
      const response = await axios.post<EventLogApiResponse>(
        process.env.NEXT_PUBLIC_API_URL + "/EventLog/filter",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      const responseMonitor = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/EventLog/getAllMonitoredUsers",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setMonitorData(responseMonitor.data);

      const eventLogs = response.data.results;
      setTotalPages(Math.ceil(response.data.numberFound / rowsPerPage));

      if (currentPage === 1) {
        setData(eventLogs);
      } else {
        setData((prev) => [...prev, ...eventLogs]);
      }
    } catch (err) {
      console.error("axios error:", err);
    }
  };

  useEffect(() => {
    const fetchDataIfConnected = async () => {
      await checkServerStatus(setIsOnline, setOfflineIssue, getToken);

      if (isOnline == null) return;
      await fetchData();
    };

    fetchDataIfConnected();
  }, [filterText, ascending, selectedColumn, currentPage, isOnline]);

  useEffect(() => {
    setVisibleRows(
      [...data].filter((log) =>
        log[selectedColumn]
          ?.toString()
          .toLowerCase()
          .includes(filterText.toLowerCase())
      )
    );
  }, [data, selectedColumn, filterText]);

  const sortData = (column: keyof EventLog) => {
    setSelectedSortColumn(column);
    setAscending(!ascending);
  };

  const filterData = () => {
    setCurrentPage(1);
    setIsFilterModalOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <>
      <Navbar />
      <MainContainer>
        <DashboardContainer>
          {!isOnline && <p>OFFLINE MODE</p>}
          {offlineIssue === "network" && <p>NETWORK ISSUES</p>}
          {offlineIssue === "server" && <p>SERVER ISSUES</p>}

          <h1>Admin panel</h1>

          <h3>Monitored users</h3>

          <TableContainer id="scrollable-event-logs" ref={tableContainerRef}>
            <InfiniteScroll
              dataLength={monitorData.length}
              style={{ width: "100%" }}
              next={() => {
                setCurrentPage((prev) => prev + 1);
              }}
              hasMore={false}
              loader={<h4>Loading more logs...</h4>}
              endMessage={<p>No more monitored users</p>}
              scrollableTarget="scrollable-event-logs"
            >
              <StyledTable>
                <thead>
                  <tr>
                    {monitoredUsersColumns.map((col: any, index: any) => (
                      <th
                        key={index}
                        style={{ textAlign: index === 0 ? "left" : "center" }}
                      >
                        {String(col)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {monitorData.map((log, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {monitoredUsersColumns.map(
                        (col: keyof MonitoredUser, colIndex: any) => (
                          <td key={`${rowIndex}-${colIndex}`}>
                            <p
                              style={{
                                textAlign: colIndex === 0 ? "left" : "center",
                                borderRadius: "5px",
                                wordWrap: "break-word",
                                maxWidth: "400px",
                              }}
                            >
                              {col == "critical"
                                ? log[col]
                                  ? "Yes"
                                  : "No"
                                : log[col]}
                            </p>
                          </td>
                        )
                      )}
                    </TableRow>
                  ))}
                </tbody>
              </StyledTable>
            </InfiniteScroll>
          </TableContainer>

          <h3>Event logs</h3>

          <TableContainer id="scrollable-event-logs" ref={tableContainerRef}>
            <InfiniteScroll
              dataLength={data.length}
              style={{ width: "100%" }}
              next={() => {
                setCurrentPage((prev) => prev + 1);
              }}
              hasMore={currentPage < totalPages}
              loader={<h4>Loading more logs...</h4>}
              endMessage={<p>No more event logs</p>}
              scrollableTarget="scrollable-event-logs"
            >
              <StyledTable>
                <thead>
                  <tr>
                    {columns.map((col: any, index: any) => (
                      <th
                        key={index}
                        style={{ textAlign: index === 0 ? "left" : "center" }}
                        onClick={() => sortData(col)}
                      >
                        {String(col)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((log, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {columns.map((col: keyof EventLog, colIndex: any) => (
                        <td key={`${rowIndex}-${colIndex}`}>
                          <p
                            style={{
                              textAlign: colIndex === 0 ? "left" : "center",
                              borderRadius: "5px",
                              wordWrap: "break-word",
                              maxWidth: "400px",
                            }}
                          >
                            {col == "time"
                              ? formatDate(log[col] as string)
                              : log[col]}
                          </p>
                        </td>
                      ))}
                    </TableRow>
                  ))}
                </tbody>
              </StyledTable>
            </InfiniteScroll>
          </TableContainer>
        </DashboardContainer>
      </MainContainer>
    </>
  );
};

export default AdminCachePage;
