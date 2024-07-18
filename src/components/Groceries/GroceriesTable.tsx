import * as React from "react";
import { Alert, Box, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";

import Table from "../ui/Table";
import { Filter } from "../ui/Filter";
import { HeadCell, Order } from "../ui/TableHead";

import { getUniquePropertyValues } from "../../lib/helpers/getUniquePropertyValues";
import { useFetchData } from "../../lib/hooks/useFetchData";
import { CalculatedGroceryItem, groceriesData } from "../../api/data";

const headCells: HeadCell<CalculatedGroceryItem>[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "section",
    numeric: true,
    disablePadding: false,
    label: "Section",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price (€)",
  },
  {
    id: "pricePerWeight",
    numeric: true,
    disablePadding: false,
    label: "Price / 100g (€)",
  },
];

const DEFAULT_ROWS = 10;

export const GroceriesTable = () => {
  const sectionFilterOptions = getUniquePropertyValues(
    groceriesData,
    "section" as keyof CalculatedGroceryItem
  );

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

  const handleChangePage = (event: unknown, newPage: number) => {
    refetch();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    refetch();
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof CalculatedGroceryItem
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setPage(0);
    refetch();
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectFilterOptions = (options: string[]) => {
    setPage(0);
    setSelectedFilterOptions(options);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Toolbar
        sx={{
          pl: { sm: 0 },
          pr: { xs: 0, sm: 0 },
        }}
      >
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
          textAlign="left"
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
          data={data}
          count={count}
          isLoading={isLoading}
          headCells={headCells}
          page={page}
          order={order}
          orderBy={orderBy}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          onRequestSort={handleRequestSort}
        />
      ) : (
        <Box
          width="100%"
          height="600px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Alert severity="error">Error fetching groceries</Alert>
        </Box>
      )}
    </Box>
  );
};
