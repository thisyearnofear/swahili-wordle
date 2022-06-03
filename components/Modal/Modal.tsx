import { useCallback, useEffect, useState } from "react";
import { selectIsModalShown, selectModalContent, setModalContent, setShowModal } from "store/appSlice";
import { selectWord, setDidPlayerWin, setFinished, setGameOver } from "store/gameSlice";
import { checkWord, decodeWord, existsWord } from "api/api";
import {
	selectCurrentKeys,
	selectCurrentRow,
	selectEnter,
	setCurrentKeys,
	setCurrentRow,
	setEnter,
} from "store/boardSlice";
import { checkKey, checkLetter } from "utils/gamePanel";
import { useAppDispatch, useAppSelector } from "store/hooks";

const Modal = () => {
	const dispatch = useAppDispatch();
	const showModal = useAppSelector(selectIsModalShown);
	const modalContent = useAppSelector(selectModalContent);
	const [wordDecoded, setWordDecoded] = useState("");

	const gameIsOver = useCallback(() => {
		dispatch(setGameOver(true));
		dispatch(setShowModal(false));
		dispatch(setModalContent(null));
	}, [dispatch]);

	// useEffect(() => {
	// 	if (modalContent?.showWord)
	// 		(async () => {
	// 			try {
	// 				const { word: decoded } = await decodeWord(word);
	// 				setWordDecoded(decoded);
	// 			} catch (error) {
	// 				console.log(error);
	// 			} finally {
	// 				console.log("decoded");
	// 			}
	// 		})();
	// }, [modalContent, word]);

	return (
		<>
			{showModal && (
				<div className="z-50 absolute mx-auto w-full h-[324px] md:h-[420px] flex items-center justify-center">
					<div className="w-1/2 h-[110px] bg-white rounded-xl shadow-2xl drop-shadow-2xl text-xl font-bold center-c px-4 py-3 text-center">
						<span>{modalContent?.content}</span>
						{modalContent?.showWord && (
							<span className="text-xs font-normal">
								Palabra: <span className="text-[#6ac66a] font-medium">{wordDecoded}</span>
							</span>
						)}
						{modalContent?.showButton && (
							<button className="button-restart" onClick={() => gameIsOver()}>
								Reiniciar
							</button>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
