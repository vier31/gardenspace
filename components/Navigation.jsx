import Link from "next/link";

function Navigation(props) {
	return (
		<div>
			<Link href="/">Home</Link>
			<Link href="/garden">Garden</Link>
		</div>
	);
}

export default Navigation;
