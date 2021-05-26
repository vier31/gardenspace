import { useRouter } from "next/router";
import Link from "next/link";
import { getAllNotes, getNoteBySlug } from "../../../lib/api";
import ReactMarkdown from "react-markdown";

export default function Note({ note }) {
	const router = useRouter();
	if (!router.isFallback && !note?.slug) {
		return <div>Upps</div>;
	}

	return (
		<>
			<h2>{note.title}</h2>
			<ReactMarkdown
				children={note.content}
				components={{
					a: ({ href, children }) => (
						<Link href={`/garden/notes/${href}`}>
							<span className="cursor-pointer text-yellow-700">{children}</span>
						</Link>
					),
				}}
			/>
		</>
	);
}

export async function getStaticProps({ params }) {
	const note = getNoteBySlug(params.slug, [
		"title",
		"plantedAt",
		"lastTendedAt",
		"slug",
		"author",
		"content",
		"coverImage",
	]);

	return {
		props: {
			note,
		},
	};
}

export async function getStaticPaths() {
	const notes = getAllNotes(["slug"]);

	return {
		paths: notes.map(note => {
			return {
				params: {
					slug: note.slug,
				},
			};
		}),
		fallback: false,
	};
}
