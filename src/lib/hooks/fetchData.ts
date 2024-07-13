import * as React from "react";
import { mappedGroceriesData, GroceriesData } from "../../data";

export const useFetchData = (
  url: string,
  selectedSectionFilterOptions: string[]
) => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Encapsulate data fetching logic into a separate function
  const fetchData = React.useCallback(() => {
    console.log(`Fetching Data from ${url}...`);
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(() => {
          if (selectedSectionFilterOptions.length > 0) {
            const filteredData: GroceriesData[] = mappedGroceriesData().filter(
              (item) => selectedSectionFilterOptions.includes(item.section)
            );
            return filteredData;
          }

          return mappedGroceriesData();
        });
      }, 500); // Simulate a 2 second delay
    })
      .then((res) => {
        setData(res as any);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [selectedSectionFilterOptions, url]);

  // Fetch data on mount and when selectedSectionFilterOptions changes
  React.useEffect(() => {
    fetchData();
  }, [selectedSectionFilterOptions, fetchData]);

  return { data, isLoading, refetch: fetchData };
};
