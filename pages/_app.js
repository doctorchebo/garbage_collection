import Head from "next/head";
import "../styles/globals.css";
import favicon from "../public/favicon.ico";
import * as React from "react";
import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "../app/store";

function MyApp({ Component, pageProps }) {
  const [dark, setDark] = useState(false);
  console.log(dark);
  const theme = createTheme({
    palette: {
      type: dark ? "dark" : "light",
      primary: {
        main: "#4a9034",
      },
      secondary: {
        main: "#454ec9",
      },
    },
  });
  return (
    <div>
      <Head>
        <link rel="shortcut icon" href={favicon.src} type="image/x-icon" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} dark={dark} setDark={setDark} />
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default MyApp;
