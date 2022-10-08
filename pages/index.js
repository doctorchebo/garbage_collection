import { Box, Container } from "@mui/material";
import styles from "../styles/Home.module.css";
import Map from "./components/map";
import SearchForm from "./components/searchForm";

export default function Home() {
  return (
    <Box position="relative">
      <SearchForm />
      <Map />
    </Box>
  );
}
