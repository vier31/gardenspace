import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import GardenFence from "../../../components/GardenFence";
import { getAllNotes, getNoteBySlug } from "../../../lib/api";
import ReactMarkdown from "react-markdown";
import { startsWith } from "lodash";
import GardenHeader from "../../../components/GardenHeader";

export default function Note({ note }) {
	const router = useRouter();
	if (!router.isFallback && !note?.slug) {
		return <div>Upps</div>;
	}

	return (
		<GardenFence>
			<GardenHeader>{note.title}</GardenHeader>
			{note.coverImage ? (
				<Image
					src={note.coverImage}
					alt={note.imgAlt}
					height={500}
					width={500}
				/>
			) : null}
			<ReactMarkdown
				children={note.content}
				components={{
					a: ({ href, children }) => {
						if (startsWith(href, "http")) {
							return (
								<Link href={href}>
									<span className="cursor-pointer text-yellow-700">
										{children}
									</span>
								</Link>
							);
						} else {
							return (
								<Link href={`/garden/notes/${href}`}>
									<span className="cursor-pointer text-yellow-700">
										{children}
									</span>
								</Link>
							);
						}
					},
				}}
			/>
		</GardenFence>
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
		"imgAlt",
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
