import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#003c79ff", // Blue
    },
    secondary: {
      main: "#00c261ff", // Pink
    },
    background: {
      default: "#f4f6f8", // Light gray background
    },
  },
  typography: {
    fontFamily: "poppins",
    h1: { fontWeight: 600, fontSize: "2rem" },
    h2: { fontWeight: 500, fontSize: "1.5rem" },
    body1: { fontSize: "1rem" },
  },
});

export default theme;
