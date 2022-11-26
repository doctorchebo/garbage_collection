import Head from "next/head";
import "../styles/globals.css";
import favicon from "../public/favicon.ico";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <link rel="shortcut icon" href={favicon.src} type="image/x-icon" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
