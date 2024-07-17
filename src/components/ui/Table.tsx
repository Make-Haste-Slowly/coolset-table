import * as React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Box from "@mui/material/Box";
import { default as MuiTable } from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Alert } from "@mui/material";

import EnhancedTableHead, { HeadCell, Order } from "./TableHead";
import { DataType } from "../../api/data";

interface TableProps<T extends DataType> {
  isLoading: boolean;
  data: T[];
  count: number;
  headCells: HeadCell<T>[];
  page: number;
  order: Order;
  orderBy: keyof T;
  rowsPerPage: number;
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
}

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50];

export default function Table<T extends DataType>({
  data,
  count,
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
  const populatedRows = React.useMemo(() => data, [data]);
  const rows = isLoading ? new Array(rowsPerPage).fill(0) : populatedRows;

  return (
    <>
      {isLoading || data.length > 0 ? (
        <>
          <TableContainer
            sx={{
              height: "calc(100vh - 164px);",
            }}
          >
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
                {rows.map((row) => {
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
                            {isLoading ? (
                              <Skeleton count={1} />
                            ) : (
                              (row[cell.id] as React.ReactNode)
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
                {!isLoading && populatedRows.length !== rowsPerPage && (
                  <TableRow
                    sx={{
                      height:
                        53 * (ROWS_PER_PAGE_OPTIONS[0] - populatedRows.length),
                      border: "none",
                    }}
                  >
                    <TableCell
                      colSpan={6}
                      align="left"
                      sx={{ border: "none" }}
                    />
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
            rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
        </>
      ) : (
        <Box
          width="100%"
          height="600px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Alert severity="info">No Data</Alert>
        </Box>
      )}
    </>
  );
}
