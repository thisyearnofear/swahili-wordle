import { useRef, useState } from "react";
import { setChallengeActive } from "store/appSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { Modal } from "./Game/Modal";

export function Challenge() {
  const dispatch = useAppDispatch();
  const isChallengeActive = useAppSelector((state) => state.isChallengeActive);
  const [value, setValue] = useState("");
  const validRef = useRef<HTMLDivElement>(null);
  const invalidRef = useRef<HTMLDivElement>(null);

  return (
    <Modal
      title="Wordle Generator"
      titleClass="lost"
      active={isChallengeActive}
      onClose={() => dispatch(setChallengeActive(false))}
    >
      <div className="cont">
        <div className="desc">Challenge your friend with any word from 4 to 11 letters:</div>
        <div className="line_form">
          <div className="field">
            <input
              type="text"
              name="input"
              className="input"
              placeholder="Your word ..."
              minLength={4}
              maxLength={11}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>
        <div ref={validRef} className="desc valid" style={{ display: "none" }}>
          Link Copied!
        </div>
        <div ref={invalidRef} className="desc not_valid" style={{ display: "none" }}>
          Word not found
        </div>
        <div className="copy_btn">
          <button
            type="button"
            onClick={() => {
              if (!validRef.current || !invalidRef.current) return;
              const animate = (e: HTMLDivElement) => {
                e.style.display = "block";
                setTimeout(() => (e.style.display = "none"), 3000);
              };
              const create = (word: string) => false;

              if (value.length < 4 || value.length > 11) return animate(invalidRef.current);

              const link = create(value);

              if (!link) return animate(invalidRef.current);

              animate(validRef.current);
            }}
          >
            Copy link
          </button>
        </div>
      </div>
    </Modal>
  );
}
