import { CalculatedGroceryItem, groceriesData } from "./data";
import { IQueryParams } from "../lib/hooks/useFetchData";
import { calculatePricePerWeight } from "../lib/helpers/calculatePricePerWeight";
import { getComparator } from "../lib/helpers/getComparator";
import { stableSort } from "../lib/helpers/stableSort";

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
