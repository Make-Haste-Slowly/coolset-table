// This function compares two objects (a and b) based on the value of a specified property (orderBy) in descending order.
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// This function returns a comparator function tailored to the specified sort order (order) and property (orderBy). The comparator can be used for sorting arrays of objects.
export function getComparator<Key extends keyof any>(
  order: any,
  orderBy: any
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
