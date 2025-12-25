import { notFound } from "next/navigation"
import React from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkBreaks from "remark-breaks"
import { AddConversationContext } from "./_components/add-conversation-context"
import { AddKeywords } from "./_components/add-keywords"
import { WebsiteContentProcess } from "./_components/website-content-process"

const projects = ["genkijacs", "placement-test"]

export function generateStaticParams() {
	return projects.map((slug) => ({ slug }))
}

export default async function Page(props: {
	params: Promise<{ project: string }>
}) {
	const params = await props.params
	const project = params.project

	if (!projects.includes(project)) {
		notFound()
	}

	const markdown = (await import(`@/content/projects/${project}.md`)).default

	return (
		<article className="prose prose-neutral dark:prose-invert container mx-auto max-w-4xl px-4 py-20">
			<ReactMarkdown
				remarkPlugins={[remarkBreaks]}
				rehypePlugins={[rehypeRaw]}
				components={
					{
						p: (props: any) => {
							const { children, ...rest } = props
							const hasBlock = React.Children.toArray(children).some(
								(child: any) =>
									React.isValidElement(child) && typeof child.type !== "string",
							)
							if (hasBlock) {
								return <div {...rest}>{children}</div>
							}
							return <p {...rest}>{children}</p>
						},
						addkeywords: (props: any) => <AddKeywords {...props} />,
						addconversationcontext: (props: any) => (
							<AddConversationContext {...props} />
						),
						websitecontentprocess: (props: any) => (
							<WebsiteContentProcess {...props} />
						),
					} as any
				}
			>
				{markdown}
			</ReactMarkdown>
		</article>
	)
}
