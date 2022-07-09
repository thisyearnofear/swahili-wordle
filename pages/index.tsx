import { getRandomWord } from "data";
import { GetStaticProps } from "next";

import Game from "components/Game/Game";
import Header from "components/Header/Header";

interface AppProps {
  word: string;
}

export default function App({ word }: AppProps) {
  return (
    <>
      <Header />
      <Game initialWord={word} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      word: getRandomWord(),
    },
  };
};
