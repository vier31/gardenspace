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
          <Link href="/p5">
            <span className="mr-8 cursor-pointer">P5</span>
          </Link>
        </div>
      </div>
      {/* todo: make site searchable */}
      {/* <div className="m-8">
				<p>Search</p>
			</div> */}
      {children}
    </>
  );
}

export default Page;
