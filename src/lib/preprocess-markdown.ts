export function preprocessMarkdown(input: {
	markdown: string
	tagsToProcess: string[]
}): string {
	let processed = input.markdown

	for (const tag of input.tagsToProcess) {
		const regex = new RegExp(`(<${tag}[^>]*>)([\\s\\S]*?)(<\\/${tag}>)`, "gi")
		processed = processed.replace(
			regex,
			(_match, openTag, content, closeTag) => {
				const processedContent = content.replace(/\n\s*\n/g, "\n<br /><br />\n")
				return `${openTag}${processedContent}${closeTag}`
			},
		)
	}

	return processed
}
