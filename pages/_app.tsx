import "styles/globals.css";
import "styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "store/store";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Wordle Game</title>
				<link rel="icon" href="/favicon.png" />
			</Head>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</>
	);
}

export default MyApp;
