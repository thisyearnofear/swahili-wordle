export function resetGame() {
  const remover = (key: Element) => {
    key.setAttribute("data-animation", "none");
    key.classList.remove("letter-correct", "letter-elsewhere", "letter-absent", "selected");
  };
  const keys = document.querySelectorAll(".Game-keyboard-button");
  const letters = document.querySelectorAll(".Row-letter");
  keys.forEach(remover);
  letters.forEach(remover);
}
