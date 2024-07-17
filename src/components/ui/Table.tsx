import * as React from "react";
import Skeleton from "react-loading-skeleton";
import Box from "@mui/material/Box";
import { default as MuiTable } from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { CircularProgress, Typography } from "@mui/material";

import EnhancedTableHead, { HeadCell, Order } from "./TableHead";
import { stableSort } from "../../lib/helpers/stableSort";
import { getComparator } from "../../lib/helpers/getComparator";
import { DataType } from "../../api/data";

interface TableProps<T extends DataType> {
  isLoading: boolean;
  data: T[];
  headCells: HeadCell<T>[];
  page: number;
  order: Order;
  orderBy: keyof T;
  rowsPerPage: number;
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
}

export default function Table<T extends DataType>({
  data,
  headCells,
  page,
  isLoading,
  order,
  orderBy,
  rowsPerPage,
  onChangePage,
  onChangeRowsPerPage,
  onRequestSort,
}: TableProps<T>) {
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort<T>(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, data]
  );

  return (
    <>
      {isLoading ? (
        <Box
          width="100%"
          height="500px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      ) : data.length > 0 ? (
        <>
          <TableContainer>
            <MuiTable
              stickyHeader
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                headCells={headCells}
                order={order}
                orderBy={orderBy as string}
                onRequestSort={onRequestSort}
              />
              <TableBody>
                {visibleRows.map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      sx={{ cursor: "pointer" }}
                    >
                      {headCells.map((cell, i) => {
                        return (
                          <TableCell
                            key={cell.id as string}
                            component="th"
                            scope="row"
                            sx={{
                              borderLeft:
                                i === 0
                                  ? `1px solid rgba(224, 224, 224, 1)`
                                  : "none",
                              borderBottom: `1px solid rgba(224, 224, 224, 1)`,
                              borderRight: `1px solid rgba(224, 224, 224, 1)`,
                            }}
                          >
                            {row[cell.id] as React.ReactNode}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} align="left" />
                  </TableRow>
                )}
              </TableBody>
            </MuiTable>
          </TableContainer>
          <TablePagination
            component="div"
            sx={{
              padding: 0,
              border: "none",
              justifySelf: "left",
              marginRight: "auto",
            }}
            rowsPerPageOptions={[10, 25, 50]}
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
        </>
      ) : (
        <Box
          width="100%"
          height="500px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography>No data</Typography>
        </Box>
      )}
    </>
  );
}
