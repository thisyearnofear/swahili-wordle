import { PlusCircleIcon, CogIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { useCallback, useRef } from "react";
import { setCookie } from "cookies-next";

export function Header({ colorScheme }: { colorScheme: "light" | "dark" }) {
  const theme = useRef<"dark" | "light">(colorScheme);

  const toggleColorTheme = useCallback(() => {
    const newTheme = theme.current === "dark" ? "light" : "dark";
    theme.current = newTheme;
    setCookie("preferred-color-theme", newTheme);
    document.documentElement.classList.toggle("dark");
  }, []);

  return (
    <header>
      <div className="cont flex">
        <a className="lang" href="#lang">
          EN
        </a>
        <button type="button" className="generator" style={{ display: "block" }} aria-label="Create a Game">
          <PlusCircleIcon width="20" height="20" />
        </button>
        <div className="buttons flex">
          <button type="button" className="button" aria-label="Settings">
            <CogIcon width="22" height="22" />
          </button>
          <button type="button" className="button" onClick={() => toggleColorTheme()} aria-label="Chage theme">
            <SparklesIcon width="22" height="22" />
          </button>
        </div>
      </div>
    </header>
  );
}
