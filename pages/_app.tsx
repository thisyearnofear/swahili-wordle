import "styles/main.min.css";
import "styles/wordle.min.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import Layout from "components/Layout/Layout";
import { store } from "store/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Wordle Game</title>
        <link rel="icon" href="/wordle/favicon.png" />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
