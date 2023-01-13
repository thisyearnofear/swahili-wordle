import { IconCirclePlus, IconSettings, IconMoon, IconSun } from "@tabler/icons";
import { useCallback, useState } from "react";
import { setCookie } from "cookies-next";
import { useAppDispatch } from "store/hooks";
import { setChallengeActive, setSettingsActive } from "store/appSlice";
import { useLocale } from "hooks/use-locale";
import { useTranslation } from "hooks/use-translations";

export function Header({ colorScheme }: { colorScheme: "light" | "dark" }) {
  const dispatch = useAppDispatch();
  const { locale } = useLocale();
  const translation = useTranslation();

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
          {locale.toUpperCase()}
        </a>
        <button
          type="button"
          className="generator"
          style={{ display: "block" }}
          onClick={() => dispatch(setChallengeActive(true))}
          aria-label={translation.wordle_generator_title}
        >
          <IconCirclePlus width="20" height="20" />
        </button>
        <div className="buttons flex">
          <button
            type="button"
            className="button"
            aria-label={translation.settings}
            onClick={() => dispatch(setSettingsActive(true))}
          >
            <IconSettings size={22} />
          </button>
          <button
            type="button"
            className="button"
            onClick={() => toggleColorTheme()}
            aria-label={translation.dark_mode_description}
          >
            {theme === "dark" ? <IconMoon size={22} /> : <IconSun size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
