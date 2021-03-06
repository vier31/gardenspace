import Link from "next/link";
import GardenFence from "../components/GardenFence";
import GardenHeader from "../components/GardenHeader";
import { getAllNotes, getAllTagsFromNotes } from "../lib/api";

const Garden = ({ allNotes = [], allTags = [] }) => {
	return (
		<GardenFence>
			<GardenHeader>Welcome to the garden</GardenHeader>
			<ul>
				<h4 className="text-lg mb-4">Enter via tags:</h4>
				{allTags.map(tag => (
					<Link key={tag} href={`garden/tags/${tag}`}>
						<li className="cursor-pointer inline max-w-min text-lg mr-2 p-2 rounded-md border border-solid border-gray-500">
							{tag}
						</li>
					</Link>
				))}
			</ul>
			<ul>
				<h4 className="text-lg mt-8 mb-2">Enter via most recent notes:</h4>
				{allNotes.map(note => (
					<Link key={note.slug} href={`garden/notes/${note.slug}`}>
						<li className="cursor-pointer">{note.title}</li>
					</Link>
				))}
			</ul>
		</GardenFence>
	);
};

export async function getStaticProps() {
	const allNotes = getAllNotes(["title", "slug", "coverImage", "tags"]);
	const allTags = getAllTagsFromNotes(allNotes);

	return {
		props: { allNotes, allTags },
	};
}

export default Garden;
