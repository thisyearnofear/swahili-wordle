import KeyRow from "components/Key/KeyRow";
import { useWindowEvent } from "hooks/useWindowEvent";
import { useEffect } from "react";
import { keyboard } from "utils/keyboard";
import { useAppSelector } from "store/hooks";
import { selectCurrentKeys, selectBackspace, selectEnter } from "store/boardSlice";
import GameRow from "./GameRow";
import { useGame } from "hooks/useGame";

const Game = () => {
	const { deleteLastLetter, passToNextRow, addNewKeyWithEvent } = useGame();

	const backspace = useAppSelector(selectBackspace);
	const enter = useAppSelector(selectEnter);
	const keys = useAppSelector(selectCurrentKeys);

	useEffect(() => {
		if (backspace) deleteLastLetter();
	}, [backspace, deleteLastLetter]);

	useEffect(() => {
		if (enter) passToNextRow();
	}, [enter, passToNextRow]);

	useWindowEvent("keydown", addNewKeyWithEvent);

	return (
		<div className="game-wrapper">
			<div className="game_rows">
				{[...Array(6)].map((_, i) => (
					<GameRow rowId={i} keys={keys[i as keyof typeof keys]} key={i} />
				))}
			</div>
			<div className="Game-keyboard">
				{keyboard.map((keys, i) => (
					<KeyRow key={i} keys={keys} />
				))}
			</div>
		</div>
	);
};

export default Game;
