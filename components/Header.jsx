import React from "react";
import Navigation from "./Navigation";

function Header(props) {
	return (
		<>
			<div className="bar">
				<Navigation />
			</div>
			<div className="sub-bar">
				<p>Search</p>
			</div>
		</>
	);
}

export default Header;
