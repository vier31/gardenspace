import Link from "next/link";
import { getAllNotes, getAllTagsFromNotes } from "../lib/api";

const garden = ({ allNotes = [], allTags = [] }) => {
	return (
		<>
			<p>Enter the garden</p>
			<ul>
				{allTags.map(tag => (
					<Link key={tag} href={`garden/tags/${tag}`}>
						<li>{tag}</li>
					</Link>
				))}
			</ul>
			<ul>
				{allNotes.map(note => (
					<Link key={note.slug} href={`garden/notes/${note.slug}`}>
						<li>{note.title}</li>
					</Link>
				))}
			</ul>
		</>
	);
};

export async function getStaticProps() {
	const allNotes = getAllNotes(["title", "slug", "coverImage", "tags"]);
	const allTags = getAllTagsFromNotes(allNotes);

	return {
		props: { allNotes, allTags },
	};
}

export default garden;
