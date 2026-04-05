// App.tsx
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Button, Box } from "@mui/material";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#90caf9" : "#1976d2",
      },
      background: {
        default: darkMode ? "#121212" : "#f5f5f5",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          variant="contained"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Modo Claro" : "Modo Escuro"}
        </Button>
      </Box>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;