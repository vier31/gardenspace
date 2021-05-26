function TagListItem({ tag }) {
	return (
		<li className="border border-gray-300 dark:border-gray-700 h-6 w-20 mb-4 md:mb-0 rounded-md flex items-center justify-center">
			<span className="text-xs text-gray-800 dark:text-gray-100 font-normal">
				{tag}
			</span>
		</li>
	);
}

export default TagListItem;
