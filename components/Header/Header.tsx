import Image from "next/image";
import { PlusCircleIcon, ChartBarIcon, CogIcon, SparklesIcon } from "@heroicons/react/solid";

const Header = () => {
	return (
		<header>
			<div className="logo">
				<Image width={227.67} height={22} src="/logo.svg" alt="" className=""></Image>
			</div>
			<div className="cont flex">
				<a className="lang mini_modal_link" data-modal-id="#modal_languages" href="#main">
					EN
				</a>
				<button type="button" className="generator" style={{ display: "block" }}>
					<PlusCircleIcon width="20" height="20" />
				</button>
				{/* <button type="button" className="give_up" style={{ display: "block" }}>
					Give up
				</button> */}
				<div className="buttons flex">
					<button type="button" className="button mini_modal_link" data-modal-id="#modal_stats">
						<ChartBarIcon width="20" height="20" />
					</button>
					<button type="button" className="button mini_modal_link" data-modal-id="#modal_settings">
						<CogIcon width="22" height="22" />
					</button>
					<button
						type="button"
						className="button mini_modal_link"
						data-modal-id="#modal_info"
						onClick={() => {
							document.querySelector("html")?.classList?.toggle?.("dark");
							document.querySelector("body")?.classList?.toggle?.("dark-theme");
						}}
					>
						<SparklesIcon width="22" height="22" />
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
