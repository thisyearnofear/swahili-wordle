import "styles/global.css";
import type { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { getCookie } from "cookies-next";
import { store } from "store/store";
import { Footer } from "components/Footer";

export default function App({ Component, pageProps, colorScheme }: AppProps & { colorScheme: "light" | "dark" }) {
  return (
    <>
      <Head>
        <title>Wordle Game</title>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content="Play Wordle with unlimited words! Can you guess the hidden word in 6 tries?"
        />
      </Head>
      <Provider store={store}>
        <div className="App">
          <Component {...pageProps} colorScheme={colorScheme} />
          <Footer />
        </div>
      </Provider>
    </>
  );
}

App.getInitialProps = ({ ctx }: AppContext) => {
  return {
    colorScheme: getCookie("preferred-color-theme", ctx),
  };
};
