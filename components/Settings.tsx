import { setCookie } from "cookies-next";
import { useTranslation } from "hooks/use-translations";
import { useRouter } from "next/router";
import { setNumberOfLetter, setSettingsActive, settingsSelector } from "store/appSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { NUMBERS_OF_LETTERS, NUMBER_OF_LETTERS_KEY } from "utils/numbers-of-letters";
import { Modal } from "./Game/Modal";

export function Settings() {
  const router = useRouter();
  const translation = useTranslation();
  const dispatch = useAppDispatch();
  const { isSettingsActive, numberOfLetters, isChallengeMode } = useAppSelector(settingsSelector);

  return (
    <Modal
      title={translation.settings}
      titleClass="lost"
      className="settings"
      active={isSettingsActive}
      onClose={() => dispatch(setSettingsActive(false))}
    >
      <div className="desc" style={{ color: "#fff", fontWeight: 600 }}>
        {translation.number_of_letters_title}
      </div>
      <div className="desc" style={{ maxWidth: 350 }}>
        {translation.number_of_letters_description}
      </div>
      <div className="numbers flex">
        {NUMBERS_OF_LETTERS.map((number) => (
          <div key={number} className="number_checkbox">
            <label className="label_check">
              <input
                type="radio"
                name="numbers"
                onChange={(e) => {
                  if (isChallengeMode) void router.replace("/");

                  const numberOfLetters = +e.target.value;
                  setCookie(NUMBER_OF_LETTERS_KEY, numberOfLetters.toString());
                  dispatch(setNumberOfLetter(numberOfLetters));
                  dispatch(setSettingsActive(false));
                }}
                autoComplete="off"
                value={number}
                checked={number === numberOfLetters}
              />
              <span className="check_text">{number}</span>
            </label>
          </div>
        ))}
      </div>
    </Modal>
  );
}
