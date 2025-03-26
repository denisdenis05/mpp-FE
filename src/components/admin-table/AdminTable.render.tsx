import { useEffect, useRef, useState } from "react";
import {
  AddButton,
  FilterButton,
  FilterContainer,
  StyledTable,
  TableContainer,
  TableRow,
} from "./AdminTable.style";
import { defaultConfig } from "next/dist/server/config-shared";
import EditDeleteItem from "../edit-delete-item";
import FilterIcon from "../../assets/filter.svg";
import { getBackgroundColor } from "@/utils";
import Chart from "../chart";

interface EditableTableProps {
  columns: string[];
  data: Record<string, any>[];
  onDataChange?: (updatedData: Record<string, any>[]) => void;
}

const AdminTable = ({ columns, data, onDataChange }: EditableTableProps) => {
  const [tableData, setTableData] = useState(data);
  const [visibleRows, setVisibleRows] = useState(data);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [ascending, setAscending] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [stats, setStats] = useState({ max: 0, min: 10, average: 0 });

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
    let sum = 0,
      number = 0;
    data.forEach((element) => {
      if (element.Rating > stats.max) stats.max = element.Rating;
      if (element.Rating < stats.min) stats.min = element.Rating;
      sum = sum + element.Rating;
      number = number + 1;
    });

    stats.average = sum / number;
    setStats(stats);
    setVisibleRows([...data]);
  }, [tableData, data]);

  const sortData = (index: string) => {
    const newData = [...tableData].sort((a, b) => {
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
              <th></th>
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
                        backgroundColor:
                          col.toLowerCase() === "rating"
                            ? getBackgroundColor(row[col], stats)
                            : "transparent",
                        borderRadius: "5px",
                      }}
                    />
                  </td>
                ))}
                <td>
                  <EditDeleteItem index={rowIndex} refresh={setVisibleRows} />
                </td>
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
      <AddButton href="/add-movie">Add new</AddButton>

      <Chart data={data} stats={stats} />
    </>
  );
};

export default AdminTable;
