import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <Link href="https://storymojaafrica.co.ke/" className="footer__logo">
            <Image width={1200} height={200} src="/logo.svg" alt="STORYMOJA" priority />
          </Link>
        </div>
        <div className="footer__bottom">
          <div className="footer__copir">
            <span>
              <a href="https://bit.ly/papaspotify" target="_blank" rel="noreferrer">
                papa
              </a>
            </span>{" "}
            © {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
}
