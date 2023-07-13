import { IconCirclePlus, IconSettings, IconMoon, IconSun } from "@tabler/icons-react";
import { useCallback, useState } from "react";
import { setCookie } from "cookies-next";
import { useAppDispatch } from "store/hooks";
import { setChallengeActive, setLanguagesActive, setSettingsActive } from "store/appSlice";
import { useLocale } from "hooks/use-locale";
import { useTranslation } from "hooks/use-translations";
import { EnglishUSFlag, SpanishFlag } from "./flags";

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
        <button className="lang" onClick={() => dispatch(setLanguagesActive(true))}>
          <span className="icon">{locale === "en" ? <EnglishUSFlag /> : <SpanishFlag />}</span>
          {locale.toUpperCase()}
        </button>
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
