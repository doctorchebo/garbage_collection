import { Box, Container } from "@mui/material";
import Map from "./components/map";
import NavBar from "./components/navBar";
import SearchForm from "./components/searchForm";

export default function Home({ dark, setDark }) {
  return (
    <Box position="relative">
      <Map dark={dark} setDark={setDark} />
    </Box>
  );
}
