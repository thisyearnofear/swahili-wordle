import Link from "next/link";
import Image from "next/image";
import { PlusCircleIcon, ChartBarIcon, CogIcon, SparklesIcon } from "@heroicons/react/solid";

const Header = ({ toggleColorTheme }: { toggleColorTheme: () => void }) => {
  return (
    <header>
      <div className="logo">
        <Link href="/">
          <a>
            <Image width={227.67} height={22} src="/wordle/logo.svg" alt="Wordle Game" />
          </a>
        </Link>
      </div>
      <div className="cont flex">
        <a className="lang">EN</a>
        <button type="button" className="generator" style={{ display: "block" }}>
          <PlusCircleIcon width="20" height="20" />
        </button>
        <div className="buttons flex">
          <button type="button" className="button">
            <ChartBarIcon width="20" height="20" />
          </button>
          <button type="button" className="button">
            <CogIcon width="22" height="22" />
          </button>
          <button type="button" className="button" onClick={() => toggleColorTheme()}>
            <SparklesIcon width="22" height="22" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
