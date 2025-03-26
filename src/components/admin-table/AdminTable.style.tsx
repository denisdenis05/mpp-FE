import styled from "styled-components";

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
  max-height: 60%;
  overflow-y: auto;
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

export {
  TableContainer,
  AddButton,
  StyledTable,
  TableRow,
  FilterContainer,
  FilterButton,
};
