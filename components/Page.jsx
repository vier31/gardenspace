import Link from "next/link";

function Page({ children }) {
	return (
		<>
			<div className="m-8">
				<div>
					<Link href="/">
						<span className="mr-8 cursor-pointer">Home</span>
					</Link>
					<Link href="/garden">
						<span className="mr-8 cursor-pointer">Garden</span>
					</Link>
				</div>
			</div>
			{/* todo: make site searchable */}
			{/* <div className="m-8">
				<p>Search</p>
			</div> */}
			<div className="max-w-sm mx-auto mt-8">{children}</div>
		</>
	);
}

export default Page;
