import { mappedGroceriesData } from "../../api/data";
import { IQueryParams } from "../hooks/fetchData";
import { getComparator } from "./getComparator";
import { stableSort } from "./stableSort";

export const filterData = async <T>({
  selectedSectionFilterOptions,
  order,
  orderBy,
  page,
  rowsPerPage,
}: IQueryParams<T>): Promise<{ count: number; data: T[] }> => {
  const filteredData =
    selectedSectionFilterOptions.length > 0
      ? (mappedGroceriesData().filter((item) =>
          selectedSectionFilterOptions.includes(item.section)
        ) as T[])
      : (mappedGroceriesData() as T[]);

  const sortedData = stableSort<T>(
    filteredData,
    getComparator(order, orderBy) as any
  );

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return {
    count: sortedData.length,
    data: paginatedData,
  };
};
