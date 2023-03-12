import Head from "next/head";
import "../styles/globals.css";
import favicon from "../public/favicon.ico";
import * as React from "react";
import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import { Provider, useSelector } from "react-redux";
import store from "../app/store";
import NavBar from "./components/navBar";
import Layout from "./components/layout";

function MyApp({ Component, pageProps }) {
  const [dark, setDark] = useState(false);
  const lightTheme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#4a9034",
      },
      secondary: {
        main: "#454ec9",
      },
      inputBackground: {
        main: "#e8f08fe",
      },
    },
  });
  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#09380D",
      },
      secondary: {
        main: "#27757E",
      },
      inputBackground: {
        main: "#e8f08fe",
      },
    },
  });
  return (
    <Provider store={store}>
      <div>
        <Head>
          <link rel="shortcut icon" href={favicon.src} type="image/x-icon" />
        </Head>
        <ThemeProvider theme={dark ? darkTheme : lightTheme}>
          <Layout dark={dark} setDark={setDark}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </div>
    </Provider>
  );
}

export default MyApp;
