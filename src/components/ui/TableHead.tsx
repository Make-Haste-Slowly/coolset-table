import * as React from "react";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";

import { DataType } from "../../api/data";

export type Order = "asc" | "desc";

export interface HeadCell<T extends DataType> {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
}

interface TableHeadProps<T extends DataType> {
  headCells: HeadCell<T>[];
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  order: Order;
  orderBy: string;
}

export default function EnhancedTableHead<T extends DataType>(
  props: TableHeadProps<T>
) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {props.headCells.map((headCell, i) => (
          <TableCell
            key={headCell.id as string}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              borderLeft: i === 0 ? `1px solid rgba(224, 224, 224, 1)` : "none",
              borderBottom: `1px solid rgba(224, 224, 224, 1)`,
              borderRight: `1px solid rgba(224, 224, 224, 1)`,
              borderTop: `1px solid rgba(224, 224, 224, 1)`,
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
