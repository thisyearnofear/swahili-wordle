import { setSettingsActive, settingsSelector } from "store/appSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { NUMBERS_OF_LETTERS } from "utils/numbers-of-letters";
import { Modal } from "./Game/Modal";

export function Settings() {
  const dispatch = useAppDispatch();
  const { isSettingsActive } = useAppSelector(settingsSelector);

  return (
    <Modal
      title="Settings"
      titleClass="lost"
      active={isSettingsActive}
      onClose={() => dispatch(setSettingsActive(false))}
    >
      <div className="desc">Number of Letters</div>
      <div className="numbers flex">
        {NUMBERS_OF_LETTERS.map((number) => (
          <div key={number} className="number_checkbox">
            <label className="label_check">
              <input
                type="radio"
                name="numbers"
                onChange={(e) => {
                  const numberOfLetters = +e.target.value;
                  localStorage.setItem("numberOfLetters", numberOfLetters.toString());
                  dispatch(setSettingsActive(false));
                }}
                autoComplete="off"
                value={number}
                defaultChecked={number === 5}
              />
              <span className="check_text">{number}</span>
            </label>
          </div>
        ))}
      </div>
    </Modal>
  );
}
