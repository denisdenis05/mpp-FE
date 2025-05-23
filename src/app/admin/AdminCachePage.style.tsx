import styled from "styled-components";

const MainContainer = styled.div`
  width: 100vw;
  height: 100%;
  box-sizing: border-box;
  align-items: center;
  text-align: center;
  padding: 5%;
  background-color: #d9d9d9;
`;

const DashboardContainer = styled.div`
  box-sizing: border-box;
  height: 100%;
  padding: 5%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
  max-height: 40vh;
  width: 100%;
  overflow: auto;
`;

const FilterContainer = styled.div`
  position: relative;
  width: 100vw;
`;

const FilterButton = styled.div`
  height: 55px;
  width: 55px;
  border-radius: 9px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 100%;
  left: 80%;
`;

const AddButton = styled.a`
  color: inherit;
  text-decoration: none;
  background-color: #9a8282;
  height: 40px;
  width: 120px;
  border-radius: 5px;
  border: none;
  outline: none;

  &:visited {
    color: inherit;
  }

  &:hover {
    text-decoration: none;
    color: inherit;
  }

  &:active {
    color: inherit;
  }
  box-shadow: none;
  font-family: inherit;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  min-height: 30vh;
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  gap: 10px;
`;

const PageButton = styled.button`
  background-color: #9a8282;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-family: inherit;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export {
  TableContainer,
  AddButton,
  StyledTable,
  TableRow,
  FilterContainer,
  FilterButton,
  PaginationContainer,
  PageButton,
  DashboardContainer,
  MainContainer,
};
