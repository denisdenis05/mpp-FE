import { useEffect, useRef, useState } from "react";
import { StyledTable, TableContainer, TableRow } from "./DashboardTable.style";
import { defaultConfig } from "next/dist/server/config-shared";

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
    </TableContainer>
  );
};

export default DashboardTable;
