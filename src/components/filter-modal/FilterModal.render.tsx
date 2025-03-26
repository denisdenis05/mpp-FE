import { COLUMNS } from "@/constants";
import {
  FilterButton,
  FilterContainer,
  FilterDropdown,
  FilterInput,
} from "./FIlterModal.style";

const FilterModal = ({
  selectedColumn,
  setSelectedColumn,
  filterText,
  setFilterText,
  filterData,
}: {
  selectedColumn: any;
  setSelectedColumn: any;
  filterText: any;
  setFilterText: any;
  filterData: any;
}) => {
  return (
    <FilterContainer>
      <FilterDropdown
        value={selectedColumn}
        onChange={(e) => setSelectedColumn(e.target.value)}
      >
        {COLUMNS.map((col) => (
          <option key={col} value={col}>
            {col}
          </option>
        ))}
      </FilterDropdown>
      <FilterInput
        value={filterText}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setFilterText(event.target.value);
        }}
      ></FilterInput>
      <FilterButton onClick={filterData}>Filter</FilterButton>
    </FilterContainer>
  );
};

export default FilterModal;
