import styled from "styled-components";

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
  max-height: 80%;
  overflow-y: auto;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: left;
  padding: 100px;

  ::-webkit-scrollbar {
    display: none;
  }

  th,
  td {
    border: none;
    padding: 10px;
    font-weight: normal;
  }

  input {
    background: none;
    width: 100%;
    border: none;
    padding: 5px;
    font-family: inherit;
  }
`;

const TableRow = styled.tr`
  td {
    align-items: center;
    justify-content: center;
  }

  td:first-child {
    justify-content: flex-start;
  }

  td:last-child {
    justify-content: flex-end;
  }
`;

export { TableContainer, StyledTable, TableRow };
