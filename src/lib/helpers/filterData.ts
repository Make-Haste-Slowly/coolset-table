import { CalculatedGroceryItem, groceriesData } from "../../api/data";
import { IQueryParams } from "../hooks/useFetchData";
import { calculatePricePerWeight } from "./calculatePricePerWeight";
import { getComparator } from "./getComparator";
import { stableSort } from "./stableSort";

export const filterData = async <T>({
  selectedSectionFilterOptions,
  order,
  orderBy,
  page,
  rowsPerPage,
}: IQueryParams<T>): Promise<{ count: number; data: T[] }> => {
  const mappedData: CalculatedGroceryItem[] = groceriesData.map((item) => ({
    ...item,
    pricePerWeight: calculatePricePerWeight(item),
  }));

  const filteredData =
    selectedSectionFilterOptions.length > 0
      ? (mappedData.filter((item) =>
          selectedSectionFilterOptions.includes(item.section)
        ) as T[])
      : (mappedData as T[]);

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
