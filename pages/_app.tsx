import "styles/global.min.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "store/store";
import Header from "components/Header";
import Footer from "components/Footer";
import { useCallback, useEffect, useState } from "react";

const PREFERRED_COLOR_THEME_KEY = "preferred-color-theme";

function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  const toggleColorTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem(PREFERRED_COLOR_THEME_KEY, newTheme);
    setTheme(newTheme);
  }, [theme]);

  useEffect(() => {
    const theme = localStorage.getItem(PREFERRED_COLOR_THEME_KEY);
    if (theme === "dark") setTheme("dark");
  }, []);

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

export default App;
