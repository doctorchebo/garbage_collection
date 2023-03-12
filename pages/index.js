import { Box, Container, createTheme, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import Map from "./components/map";
import NavBar from "./components/navBar";

export default function Home() {
  return (
    <Box position="relative">
      <Map />
    </Box>
  );
}
