import { useRouter } from "next/router";
import Link from "next/link";
import GardenFence from "../../../components/GardenFence";
import {
	getAllNotes,
	getAllTagsFromNotes,
	getNotesByTag,
} from "../../../lib/api";
import GardenHeader from "../../../components/GardenHeader";

const Tag = ({ notes, tag }) => {
	const router = useRouter();
	if (!router.isFallback && !tag) {
		return <div>Upps</div>;
	}
	return (
		<GardenFence>
			<GardenHeader>All notes tagged with: {tag}</GardenHeader>
			<ul>
				{notes.map(note => (
					<Link key={note.slug} href={`/garden/notes/${note.slug}`}>
						<li>{note.title}</li>
					</Link>
				))}
			</ul>
		</GardenFence>
	);
};

export default Tag;

export async function getStaticProps({ params }) {
	const notes = getNotesByTag(params.tag, ["title", "slug", "tags"]);

	return {
		props: {
			notes,
			tag: params.tag,
		},
	};
}

export async function getStaticPaths() {
	const notes = getAllNotes(["tags"]);
	const allTags = getAllTagsFromNotes(notes);

	return {
		paths: allTags.map(tag => {
			return {
				params: {
					tag,
				},
			};
		}),
		fallback: false,
	};
}
