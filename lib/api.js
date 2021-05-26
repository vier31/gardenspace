import fs from "fs";
import { join } from "path";
import { uniq, reduce, includes } from "lodash";
import matter from "gray-matter";

const notesDirectory = join(process.cwd(), "_seedlings/notes");

export function getNoteSlugs() {
	return fs.readdirSync(notesDirectory);
}

export function getNoteBySlug(slug, fields = []) {
	const realSlug = slug.replace(/\.md$/, "");
	const fullPath = join(notesDirectory, `${realSlug}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");
	const { data, content } = matter(fileContents);

	const items = {};

	// Ensure only the minimal needed data is exposed
	fields.forEach(field => {
		if (field === "slug") {
			items[field] = realSlug;
		}
		if (field === "content") {
			items[field] = content;
		}

		if (data[field]) {
			items[field] = data[field];
		}
	});

	return items;
}

export function getAllNotes(fields = []) {
	const slugs = getNoteSlugs();
	const notes = slugs
		.map(slug => getNoteBySlug(slug, fields))
		// show the last tended note first
		.sort((post1, post2) => (post1.lastTendedAt > post2.lastTendedAt ? -1 : 1));
	return notes;
}

export function getAllTagsFromNotes(notes = []) {
	const allTagsFromNotes = reduce(
		notes,
		(accu, { tags }) => [...accu, ...tags], // todo: safeguard against missing tags
		[]
	);
	const uniqueTags = uniq(allTagsFromNotes);

	return uniqueTags;
}

export function getNotesByTag(tag = "") {
	const allNotes = getAllNotes(["tags", "author", "title", "slug"]);

	const allNotesWithTag = allNotes.filter(({ tags }) => includes(tags, tag));

	return allNotesWithTag;
}
