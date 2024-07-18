import * as React from "react";

import { Order } from "../../components/ui/TableHead";
import { filterData } from "../../api/filterData";

export interface IQueryParams<T> {
  page: number;
  order: Order;
  orderBy: keyof T;
  selectedSectionFilterOptions: string[];
  rowsPerPage: number;
}

interface IFetchDataArgs<T> {
  url: string;
  queryParameters: IQueryParams<T>;
}

export const useFetchData = <T>({
  url,
  queryParameters,
}: IFetchDataArgs<T>) => {
  const [data, setData] = React.useState<T[]>([]);
  const [count, setCount] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { selectedSectionFilterOptions, order, orderBy, page, rowsPerPage } =
    queryParameters;

  const fetchData = React.useCallback(async () => {
    console.log(`Fetching Data from ${url}...`);
    setIsLoading(true);

    try {
      // Simulate a 0.5 second delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const { data, count } = await filterData<T>({
        selectedSectionFilterOptions,
        order,
        orderBy,
        page,
        rowsPerPage,
      });

      setData(data);
      setCount(count);
      setIsLoading(false);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      setError(error.message);
      setIsLoading(false);
    }
  }, [selectedSectionFilterOptions, order, orderBy, page, rowsPerPage, url]);

  // Fetch data on mount and when queryParameters changes
  React.useEffect(() => {
    fetchData();
  }, [
    selectedSectionFilterOptions,
    order,
    orderBy,
    page,
    rowsPerPage,
    fetchData,
  ]);

  return { data, count, error, isLoading, refetch: fetchData };
};
