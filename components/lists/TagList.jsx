import TagListItem from "./TagListItem";

export default function ({ tags }) {
	return (
		<div>
			{tags.map(tag => (
				<TagListItem tag={tag} />
			))}
		</div>
	);
}
