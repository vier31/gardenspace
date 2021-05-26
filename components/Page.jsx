import React from "react";
import Header from "./Header";

function Page({ children }) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}

export default Page;
