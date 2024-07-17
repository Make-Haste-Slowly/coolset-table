import { mappedGroceriesData, CalculatedGroceryItem } from "../../api/data";
import { IQueryParams } from "../hooks/fetchData";

export const filterData = <T>({
  selectedSectionFilterOptions,
}: // order,
// orderBy,
// page,
// rowsPerPage,
IQueryParams<T>) => {
  const filteredData = () => {
    if (selectedSectionFilterOptions.length > 0) {
      const filteredData: CalculatedGroceryItem[] =
        mappedGroceriesData().filter((item) =>
          selectedSectionFilterOptions.includes(item.section)
        );
      return filteredData;
    }
    return mappedGroceriesData();
  };

  return filteredData();
};
