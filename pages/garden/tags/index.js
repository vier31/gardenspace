// import TagList from "../../../components/lists/TagList";
import { getAllNotes, getAllTagsFromNotes } from "../../../lib/api";

const Tags = ({ allTags }) => {
	return (
		<>
			<div>Enter Notes</div>
			{/* <TagList tags={allTags} /> */}
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

export default Tags;
