import * as React from "react";
import { Alert, Box, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";

import Table from "../ui/Table";
import Filter from "../ui/Filter";
import { HeadCell, Order } from "../ui/TableHead";

import { getUniquePropertyValues } from "../../lib/helpers/getUniquePropertyValues";
import { useFetchData } from "../../lib/hooks/useFetchData";
import {
  CalculatedGroceryItem,
  groceriesData,
  GroceryItem,
} from "../../api/data";

const headCells: HeadCell<CalculatedGroceryItem>[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
    width: "25%",
  },
  {
    id: "section",
    numeric: true,
    disablePadding: false,
    label: "Section",
    width: "25%",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price (€)",
    width: "25%",
  },
  {
    id: "pricePerWeight",
    numeric: true,
    disablePadding: false,
    label: "Price / 100g (€)",
    width: "25%",
  },
];

const DEFAULT_ROWS = 10;

export const GroceriesTable = () => {
  const sectionFilterOptions = React.useRef(
    getUniquePropertyValues<GroceryItem>(groceriesData, "section")
  ).current;

  const [selectedSectionFilterOptions, setSelectedFilterOptions] =
    React.useState<string[]>([]);

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] =
    React.useState<keyof CalculatedGroceryItem>("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS);

  const { data, count, refetch, error, isLoading } =
    useFetchData<CalculatedGroceryItem>({
      url: "/groceries",
      queryParameters: {
        order,
        orderBy,
        page,
        rowsPerPage,
        selectedSectionFilterOptions,
      },
    });

  const refetchRef = React.useRef(refetch).current;

  const handleChangePage = (event: unknown, newPage: number) => {
    refetch();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    refetch();
    setRowsPerPage(parseInt(event.target.value, DEFAULT_ROWS));
    setPage(0);
  };

  const handleRequestSort = React.useCallback(
    (
      event: React.MouseEvent<unknown>,
      property: keyof CalculatedGroceryItem
    ) => {
      const isAsc = orderBy === property && order === "asc";
      setPage(0);
      refetchRef();
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [order, orderBy, refetchRef]
  );

  const handleSelectFilterOptions = React.useCallback((options: string[]) => {
    setPage(0);
    setSelectedFilterOptions(options);
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Toolbar
        sx={{
          pl: { sm: 0 },
          pr: { xs: 0, sm: 0 },
        }}
      >
        <Typography
          id="tableTitle"
          component="div"
          sx={{ flex: "1 1 100%" }}
          textAlign="left"
          variant="h6"
        >
          Today's Groceries
        </Typography>
        <Filter
          placeholder="Filter by section"
          options={sectionFilterOptions}
          selectedOptions={selectedSectionFilterOptions}
          setSelectedOptions={handleSelectFilterOptions}
        />
      </Toolbar>
      {!error ? (
        <Table
          count={count}
          data={data}
          headCells={headCells}
          isLoading={isLoading}
          order={order}
          orderBy={orderBy}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          onRequestSort={handleRequestSort}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      ) : (
        <Box
          alignItems="center"
          display="flex"
          height="600px"
          justifyContent="center"
          width="100%"
        >
          <Alert severity="error">Error fetching groceries</Alert>
        </Box>
      )}
    </Box>
  );
};
