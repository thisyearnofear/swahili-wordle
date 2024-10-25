import Head from "next/head";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useWindowEvent } from "hooks/use-window-event";
import { useGame } from "hooks/use-game";
import { GamePanel } from "components/Game/Panel";
import { GameState } from "components/Game/State";
import { Header } from "components/Header";
import { getWords } from "utils/get-words";
import { gameSelector, startGame } from "store/appSlice";
import { resetGame } from "utils/reset-game";
import { Settings } from "components/Settings";
import { Challenge } from "components/Challenge";
import { useRouter } from "next/router";
import { useTranslation } from "hooks/use-translations";
import { Languages } from "components/Languages";
import ConnectButton from "../components/ConnectButton";
import dynamic from "next/dynamic";
import ScrollingGrid from "components/ScrollingGrid";

const OnChainWordle = dynamic(() => import("components/OnchainWordle/OnchainWordle"), { ssr: true });

export default function Game({ colorScheme }: { colorScheme: "light" | "dark" }) {
  const router = useRouter();
  const translation = useTranslation();
  const dispatch = useAppDispatch();

  const { deleteLastLetter, passToNextRow, addNewKeyWithEvent, activeModal } = useGame();

  const { backspace, enter } = useAppSelector(gameSelector);

  useEffect(() => {
    if (backspace) deleteLastLetter();
  }, [backspace, deleteLastLetter]);

  useEffect(() => {
    if (enter) passToNextRow();
  }, [enter, passToNextRow]);

  useEffect(() => {
    const start = async () => {
      const timeout = setTimeout(() => {
        activeModal(translation.loading, 1000 * 60);
      }, 500);

      const words = await getWords(router.locale ?? "en");
      const challenge = router.query.challenge;
      const encodedChallengeModeWord = typeof challenge === "string" ? challenge : undefined;

      clearTimeout(timeout);
      dispatch(startGame({ words, encodedChallengeModeWord }));
      resetGame();
      activeModal(translation.make_your_first_guess, 1500);
    };
    start().catch(() => {});
  }, [
    router.locale,
    router.query.challenge,
    dispatch,
    activeModal,
    translation.loading,
    translation.make_your_first_guess,
  ]);

  useWindowEvent("keydown", addNewKeyWithEvent);

  return (
    <>
      <Head>
        <link
          rel="manifest"
          href={
            router.locale === "es"
              ? "/manifest_es.json"
              : router.locale === "sw"
                ? "/manifest_sw.json"
                : "/manifest.json"
          }
        />
      </Head>
      <ScrollingGrid />
      <div className="App-container">
        <Header colorScheme={colorScheme} />
        <div className="Game">
          <GamePanel />
          <GameState />
        </div>
        <OnChainWordle />
      </div>
      <Settings />
      <Challenge />
      <Languages />
      <ConnectButton />
    </>
  );
}
