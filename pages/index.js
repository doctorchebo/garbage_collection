import { Box, Container } from "@mui/material";
import Map from "./components/map";
import SearchForm from "./components/searchForm";

export default function Home() {
  return (
    <Box position="relative">
      <Map />
    </Box>
  );
}
