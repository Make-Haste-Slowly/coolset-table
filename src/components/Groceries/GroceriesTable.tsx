import * as React from "react";
import { Box, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";

import Table, { HeadCell } from "../ui/Table";
import { Filter } from "../ui/Filter";
import { getUniquePropertyValues } from "../../lib/helpers/table";
import { useFetchData } from "../../lib/hooks/fetchData";
import { GroceriesData, mappedGroceriesData } from "../../data";

const headCells: HeadCell<GroceriesData>[] = [
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

type Order = "asc" | "desc";

const DEFAULT_ROWS = 10;

export const GroceriesTable = () => {
  const sectionFilterOptions = getUniquePropertyValues(
    mappedGroceriesData(),
    "section" as keyof GroceriesData
  );
  const [selectedSectionFilterOptions, setSelectedFilterOptions] =
    React.useState<string[]>([]);

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof GroceriesData>("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS);

  const { data, refetch, isLoading } = useFetchData(
    "/groceries",
    selectedSectionFilterOptions
  );

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
    property: keyof GroceriesData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    refetch();
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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
          setSelectedOptions={setSelectedFilterOptions}
        />
      </Toolbar>
      <Table
        data={data}
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
    </Box>
  );
};
