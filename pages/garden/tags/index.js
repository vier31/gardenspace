// import TagList from "../../../components/lists/TagList";
import GardenFence from "../../../components/GardenFence";
import GardenHeader from "../../../components/GardenHeader";
import { getAllNotes, getAllTagsFromNotes } from "../../../lib/api";

const Tags = ({ allTags }) => {
	return (
		<GardenFence>
			<GardenHeader>Enter Notes</GardenHeader>
			{/* <TagList tags={allTags} /> */}
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

export default Tags;
