import "styles/main.min.css";
import "styles/wordle.min.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "store/store";
import Header from "components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Wordle Game</title>
        <link rel="icon" href="/wordle/favicon.png" />
      </Head>
      <Provider store={store}>
        {(Component as any).noLayout ? (
          <Component {...pageProps} />
        ) : (
          <div className="App-container">
            <div className="Game" style={{ display: "block" }}>
              <Header />
              <Component {...pageProps} />
            </div>
          </div>
        )}
      </Provider>
    </>
  );
}

export default MyApp;
