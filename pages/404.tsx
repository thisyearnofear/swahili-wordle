import Link from "next/link";

export default function NotFound() {
  return (
    <div className="b404">
      <div className="b404__title">404</div>
      <div className="b404__text">Oops! Page not found</div>
      <Link href="/">
        <a className="b404__btn">Mainpage</a>
      </Link>
    </div>
  );
}

NotFound.noLayout = true;
