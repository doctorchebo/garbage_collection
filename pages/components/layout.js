import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/system";
import { useSelector } from "react-redux";
import NavBar from "./navBar";

export default function Layout({ children, dark, setDark }) {
 
  return (
    <>
        <NavBar dark={dark} setDark={setDark}/>
        <main>{children}</main>
    </>
  );
}
