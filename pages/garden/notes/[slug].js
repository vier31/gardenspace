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
			<div className="mb-4">
				{note.tags
					? note.tags.map(tag => (
							<Link key={tag} href={`/garden/tags/${tag}`}>
								<li className="cursor-pointer inline max-w-min text-lg mr-2 p-2 rounded-md border border-solid border-gray-500">
									{tag}
								</li>
							</Link>
					  ))
					: null}
			</div>
			{note.coverImage ? (
				<Image
					src={note.coverImage}
					alt={note.imgAlt}
					height={500}
					width={800}
					layout="responsive"
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
					h1: ({ children }) => (
						<h1 className="text-xl font-semibold pl-6 mt-6 mb-2">{children}</h1>
					),
					h2: ({ children }) => (
						<h2 className="text-lg font-medium pl-6 mt-4 mb-2">{children}</h2>
					),
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
		"tags",
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
