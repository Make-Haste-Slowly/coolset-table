import { Box } from "@mui/material";
import GroceriesPage from "./pages/groceries";

function App() {
  return (
    <Box className="App" justifyContent="center" display="flex" mt={4}>
      <GroceriesPage />
    </Box>
  );
}

export default App;
