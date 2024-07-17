import * as React from "react";

import { Order } from "../../components/ui/TableHead";
import { filterData } from "../helpers/filterData";

export interface IQueryParams<T> {
  page?: number;
  order?: Order;
  orderBy?: keyof T;
  selectedSectionFilterOptions: string[];
  rowsPerPage?: number;
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
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { selectedSectionFilterOptions, order, orderBy, page, rowsPerPage } =
    queryParameters;

  // Encapsulate data fetching logic into a separate function
  const fetchData = React.useCallback(() => {
    console.log(`Fetching Data from ${url}...`);
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(() => {
          return filterData<T>({
            selectedSectionFilterOptions,
            order,
            orderBy,
            page,
            rowsPerPage,
          });
        });
        // }, 50000); // Simulate a 0.5 second delay
      }, 500); // Simulate a 0.5 second delay
    })
      .then((res) => {
        setData(res as any);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setIsLoading(false);
      });
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

  return { data, error, isLoading, refetch: fetchData };
};
