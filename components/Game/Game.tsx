import KeyRow from "components/Key/KeyRow";
import { useWindowEvent } from "hooks/useWindowEvent";
import { useEffect } from "react";
import { keyboard } from "utils/keyboard";
import { useAppSelector } from "store/hooks";
import { selectCurrentKeys, selectBackspace, selectEnter, selectRows } from "store/boardSlice";
import GameRow from "./GameRow";
import { useGame } from "hooks/useGame";
import { selectWord } from "store/gameSlice";
import Modal from "components/Modal/Modal";

interface GameProps {
	initialWord: string;
}

const Game = ({ initialWord }: GameProps) => {
	const { deleteLastLetter, passToNextRow, addNewKeyWithEvent, setWordToGuess } = useGame();

	const wordToGuess = useAppSelector(selectWord);
	const backspace = useAppSelector(selectBackspace);
	const enter = useAppSelector(selectEnter);
	const keys = useAppSelector(selectCurrentKeys);
	const shouldCheck = useAppSelector(selectRows);

	useEffect(() => {
		if (backspace) deleteLastLetter();
	}, [backspace, deleteLastLetter]);

	useEffect(() => {
		if (enter) passToNextRow();
	}, [enter, passToNextRow]);

	useEffect(() => {
		if (initialWord) setWordToGuess(initialWord);
		console.log(initialWord);
	}, [initialWord, setWordToGuess]);

	useWindowEvent("keydown", addNewKeyWithEvent);

	return (
		<>
			<div className="game-wrapper">
				<div className="game_rows">
					{[...Array(6)].map((_, i) => {
						const key = i as keyof typeof keys;
						return (
							<GameRow rowId={i} keys={keys[key]} shouldCheck={shouldCheck[key]} wordToGuess={wordToGuess} key={i} />
						);
					})}
				</div>
				<div className="Game-keyboard">
					{keyboard.map((keys, i) => (
						<KeyRow key={i} keys={keys} />
					))}
				</div>
			</div>
			{/* <div>
				<div className="alert" style={{ display: "block" }}>
					Too Short
					<div className="restart_btn">
						<button type="button">Restart</button>
					</div>
				</div>
			</div> */}
		</>
	);
};

export default Game;
