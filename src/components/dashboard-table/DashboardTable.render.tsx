import { useEffect, useRef, useState } from "react";
import {
  FilterButton,
  FilterContainer,
  StyledTable,
  TableContainer,
  TableRow,
} from "./DashboardTable.style";
import { defaultConfig } from "next/dist/server/config-shared";
import FilterModal from "../filter-modal";
import FilterIcon from "../../assets/filter.svg";

interface EditableTableProps {
  columns: string[];
  data: Record<string, any>[];
  onDataChange?: (updatedData: Record<string, any>[]) => void;
}

const DashboardTable = ({
  columns,
  data,
  onDataChange,
}: EditableTableProps) => {
  const [tableData, setTableData] = useState(data);
  const [visibleRows, setVisibleRows] = useState(data);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [ascending, setAscending] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(columns[0]);
  const [filterText, setFilterText] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  useEffect(() => {
    // const calculateVisibleRows = () => {
    //   if (tableContainerRef.current) {
    //     const containerHeight = tableContainerRef.current.offsetHeight;
    //     const rowHeight = 50;
    //     const rowsVisible = Math.floor(containerHeight / rowHeight);
    //     setVisibleRows(data.slice(0, rowsVisible));
    //   }
    // };
    // calculateVisibleRows();
    // window.addEventListener("resize", calculateVisibleRows);
    // return () => window.removeEventListener("resize", calculateVisibleRows);
  }, [data]);

  useEffect(() => {
    setVisibleRows([...tableData]);
  }, [tableData]);

  const sortData = (index: string) => {
    const newData = [...data].sort((a, b) => {
      const valA = a[index];
      const valB = b[index];
      if (typeof valA === "number" && typeof valB === "number") {
        return ascending ? valA - valB : valB - valA;
      } else if (typeof valA === "string" && typeof valB === "string") {
        return ascending ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return 0;
    });
    console.log(newData);
    setTableData(newData);
    setAscending(!ascending);
  };

  const filterData = () => {
    const newData = [...data].filter((a) =>
      a[selectedColumn]
        ?.toString()
        .toLowerCase()
        .includes(filterText.toLowerCase())
    );

    setTableData(newData);
    setAscending(!ascending);
  };

  const handleInputChange = (
    rowIndex: number,
    columnName: string,
    value: string
  ) => {
    const updatedData = tableData.map((row, index) =>
      index === rowIndex ? { ...row, [columnName]: value } : row
    );
    setTableData(updatedData);
    if (onDataChange) onDataChange(updatedData);
  };

  return (
    <>
      <FilterContainer>
        <FilterButton
          onClick={() => {
            setIsFilterModalOpen(!isFilterModalOpen);
          }}
        >
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
                  style={{
                    textAlign:
                      index === 0
                        ? "left"
                        : index === columns.length - 1
                        ? "right"
                        : "center",
                  }}
                  onClick={() => {
                    sortData(col);
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={col}>
                    <input
                      type="text"
                      value={row[col] || ""}
                      onChange={(e) =>
                        handleInputChange(rowIndex, col, e.target.value)
                      }
                      style={{
                        textAlign:
                          colIndex === 0
                            ? "left"
                            : colIndex === columns.length - 1
                            ? "right"
                            : "center",
                      }}
                    />
                  </td>
                ))}
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
    </>
  );
};

export default DashboardTable;
