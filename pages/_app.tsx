import "styles/global.css";
import type { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { getCookie } from "cookies-next";
import { store } from "store/store";
import { Footer } from "components/Footer";
import { setNumberOfLetters } from "store/appSlice";
import { getNumberOfLetters, NUMBER_OF_LETTERS_KEY } from "utils/numbers-of-letters";
import { useTranslation } from "hooks/use-translations";

export default function App({
  Component,
  pageProps,
  colorScheme,
  numberOfLetters,
}: AppProps & { colorScheme: "light" | "dark"; numberOfLetters: number }) {
  const translation = useTranslation();

  store.dispatch(setNumberOfLetters(numberOfLetters));

  return (
    <>
      <Head>
        <title>{translation.title}</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content={translation.description} />
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

  return {
    numberOfLetters: getNumberOfLetters(numberOfLettersCookie),
    colorScheme: getCookie("preferred-color-theme", ctx),
  };
};
