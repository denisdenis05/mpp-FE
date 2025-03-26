import styled from "styled-components";
import dropdownArrow from "../../assets/dropdown.svg";

const FilterContainer = styled.div`
  position: absolute;
  height: 35%;
  width: 20%;
  background-color: #d9d9d9;
  border-radius: 17px;
  display: flex;
  flex-direction: column;
  padding: 3%;
  justify-content: space-between;
  align-items: center;
  font-family: inherit;
`;

const FilterDropdown = styled.select`
  height: 60px;
  width: 100%;
  border-radius: 12px;
  text-align: center;
  appearance: none;
  background-image: url("/assets/dropdown.svg");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 20px;
`;

const FilterInput = styled.input`
  height: 40px;
  width: 100%;
  border-radius: 12px;
  box-shadow: none;
  border: none;
  font-family: inherit;
`;

const FilterButton = styled.button`
  height: 40px;
  width: 120px;
  background-color: #9a8282;
  border-radius: 9px;
  box-shadow: none;
  border: none;
  font-family: inherit;
`;

export { FilterContainer, FilterDropdown, FilterInput, FilterButton };
