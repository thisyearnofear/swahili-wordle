const Layout = ({ className, ...props }: React.HTMLProps<HTMLDivElement>) => {
	return (
		<div className="page">
			<div className="page__wrapper">
				<section className="section section--full section--main">
					<div className="container no-pading">
						<div className="wrap">
							<div className="main">
								<div className="root">
									<div className="App-container">
										<div className={`Game ${className}`} style={{ display: "block" }} {...props}></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Layout;
