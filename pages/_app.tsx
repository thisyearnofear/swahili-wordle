import "styles/global.min.css";
import type { AppProps, AppContext } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "store/store";
import Header from "components/Header";
import Footer from "components/Footer";
import { getCookie, setCookie } from "cookies-next";
import { useCallback, useState } from "react";

const PREFERRED_COLOR_THEME_KEY = "preferred-color-theme";

function MyApp({ Component, pageProps, colorTheme }: AppProps & { colorTheme: "light" | "dark" }) {
  const [theme, setTheme] = useState(colorTheme);

  const toggleColorTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setCookie(PREFERRED_COLOR_THEME_KEY, newTheme);
    setTheme(newTheme);
  }, [theme]);

  return (
    <>
      <Head>
        <title>Wordle Game</title>
        <link rel="icon" href="/wordle/favicon.png" />
      </Head>
      <div className={`App ${theme}`}>
        <Provider store={store}>
          {(Component as any).noLayout ? (
            <Component {...pageProps} />
          ) : (
            <div className="App-container">
              <div className="Game">
                <Header toggleColorTheme={toggleColorTheme} />
                <Component {...pageProps} />
              </div>
            </div>
          )}
          <Footer />
        </Provider>
      </div>
    </>
  );
}

export default MyApp;

MyApp.getInitialProps = ({ ctx }: AppContext) => {
  const colorTheme = getCookie(PREFERRED_COLOR_THEME_KEY, ctx) ?? "light";
  return { colorTheme };
};
