const withMDX = require('@next/mdx')({
	extension: /\.(md|mdx)$/,
})

module.exports = withMDX({
	pageExtensions: ['js', 'jsx', 'mdx'],
	images: {
		domains: ["res.cloudinary.com"],
	},
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
	}
});