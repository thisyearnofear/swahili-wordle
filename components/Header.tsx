import { IconCirclePlus, IconSettings, IconMoon, IconSun } from "@tabler/icons";
import { useCallback, useState } from "react";
import { setCookie } from "cookies-next";
import { useAppDispatch } from "store/hooks";
import { setChallengeActive, setSettingsActive } from "store/appSlice";

export function Header({ colorScheme }: { colorScheme: "light" | "dark" }) {
  const dispatch = useAppDispatch();

  const [theme, setTheme] = useState<"dark" | "light">(colorScheme);

  const toggleColorTheme = useCallback(() => {
    setTheme((theme) => {
      const newTheme = theme === "dark" ? "light" : "dark";
      setCookie("preferred-color-theme", newTheme);
      document.documentElement.classList.toggle("dark");
      return newTheme;
    });
  }, []);

  return (
    <header>
      <div className="cont flex">
        <a className="lang" href="#lang">
          EN
        </a>
        <button
          type="button"
          className="generator"
          style={{ display: "block" }}
          onClick={() => dispatch(setChallengeActive(true))}
          aria-label="Create a Game"
        >
          <IconCirclePlus width="20" height="20" />
        </button>
        <div className="buttons flex">
          <button
            type="button"
            className="button"
            aria-label="Settings"
            onClick={() => dispatch(setSettingsActive(true))}
          >
            <IconSettings size={22} />
          </button>
          <button type="button" className="button" onClick={() => toggleColorTheme()} aria-label="Chage theme">
            {theme === "dark" ? <IconMoon size={22} /> : <IconSun size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
