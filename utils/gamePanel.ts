export const getLetter = function (row: number, col: number) {
  return document.querySelector(`.row-letter[data-row='${row}'][data-col='${col}']`);
};

export const checkLetter = (row: number, letter: number, keys: { [x: string]: { class: any } }) => {
  const el = getLetter(row, letter);
  const opt = keys[letter].class;
  el?.setAttribute("data-animation", "flip");
  setTimeout(() => el?.classList.add(opt), 175);
  setTimeout(() => el?.setAttribute("data-animation", "none"), 300);
};

export const checkKey = (letter: { key: string; class: string }) => {
  const el = document.querySelector(`.keyboard-key[data-key=${letter.key.toLowerCase()}]`);
  if (el?.classList.contains("letter-correct")) return;
  if (el?.classList.contains(letter.class)) return;
  el?.setAttribute("data-animation", "flip");
  setTimeout(() => {
    el?.classList.remove("letter-correct", "letter-elsewhere", "letter-absent");
    el?.classList.add(letter.class);
  }, 175);
  setTimeout(() => el?.setAttribute("data-animation", "none"), 300);
};

export const removeLetterRow = (row: number, col: number) => {
  const el = getLetter(row, col);
  el?.setAttribute("data-animation", "none");
  el?.classList.remove("selected");
  el?.classList.remove("letter-correct", "letter-elsewhere", "letter-absent");
  el && (el.innerHTML = "");
};

export const resetKeys = () => {
  const keys = document.querySelectorAll(".keyboard-key");
  keys.forEach((key) => {
    key.setAttribute("data-animation", "none");
    key.classList.remove("letter-correct", "letter-elsewhere", "letter-absent");
  });
};
