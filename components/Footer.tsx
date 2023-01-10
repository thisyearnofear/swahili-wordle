import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <Link href="/" className="footer__logo">
            <Image width={227.67} height={22} src="/wordle/logo.svg" alt="Wordle Game - Play Unlimited" priority />
          </Link>
        </div>
        <div className="footer__bottom">
          <div className="footer__copir">
            <span>
              <a href="https://github.com/iswilljr" target="_blank" rel="noreferrer">
                iswilljr
              </a>
            </span>{" "}
            © {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
}
