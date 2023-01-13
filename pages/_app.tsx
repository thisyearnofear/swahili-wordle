import "styles/global.css";
import type { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { getCookie } from "cookies-next";
import { store } from "store/store";
import { Footer } from "components/Footer";
import { setNumberOfLetters } from "store/appSlice";
import { DEFAULT_NUMBER_OF_LETTERS, NUMBER_OF_LETTERS_KEY } from "utils/numbers-of-letters";

export default function App({
  Component,
  pageProps,
  colorScheme,
  numberOfLetters,
}: AppProps & { colorScheme: "light" | "dark"; numberOfLetters: number }) {
  store.dispatch(setNumberOfLetters(numberOfLetters));

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
  const numberOfLettersCookie = getCookie(NUMBER_OF_LETTERS_KEY, ctx);
  const numberOfLetters = +(numberOfLettersCookie ?? 0) || DEFAULT_NUMBER_OF_LETTERS;

  return {
    numberOfLetters,
    colorScheme: getCookie("preferred-color-theme", ctx),
  };
};
