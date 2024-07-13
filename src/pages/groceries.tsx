import { Box } from "@mui/material";
import { GroceriesTable } from "../components/Groceries/GroceriesTable";

export default function GroceriesPage() {
  return (
    <Box className="App" justifyContent="center" display="flex" mt={4}>
      <Box width="90%">
        <GroceriesTable />
      </Box>
    </Box>
  );
}
