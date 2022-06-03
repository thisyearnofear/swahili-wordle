import { useEffect, useRef } from "react";

export interface GameRowProps {
	rowId: number;
	keys: string[];
}

export default function GameRow({
	rowId,
	keys,
	className = "",
	...props
}: GameRowProps & React.HTMLProps<HTMLDivElement>) {
	const rowLetter1 = useRef<HTMLDivElement>(null);
	const rowLetter2 = useRef<HTMLDivElement>(null);
	const rowLetter3 = useRef<HTMLDivElement>(null);
	const rowLetter4 = useRef<HTMLDivElement>(null);
	const rowLetter5 = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const letters = [rowLetter1, rowLetter2, rowLetter3, rowLetter4, rowLetter5];
		letters.forEach((letter, i) => {
			const el = letter?.current;
			if (keys[i]) {
				el?.classList.add("selected");
				el?.setAttribute("data-animation", "pop");
			} else {
				el?.classList.remove("selected");
				el?.setAttribute("data-animation", "node");
			}
		});
	}, [keys]);

	return (
		<div className={`Row ${className}`} {...props}>
			<div ref={rowLetter1} className="Row-letter" data-animation="none">
				{keys[0] ?? ""}
			</div>
			<div ref={rowLetter2} className="Row-letter" data-animation="none">
				{keys[1] ?? ""}
			</div>
			<div ref={rowLetter3} className="Row-letter" data-animation="none">
				{keys[2] ?? ""}
			</div>
			<div ref={rowLetter4} className="Row-letter" data-animation="none">
				{keys[3] ?? ""}
			</div>
			<div ref={rowLetter5} className="Row-letter" data-animation="none">
				{keys[4] ?? ""}
			</div>
		</div>
	);
}
