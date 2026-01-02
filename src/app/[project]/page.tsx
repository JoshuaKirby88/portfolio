import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import React from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkBreaks from "remark-breaks"
import { homeContent } from "@/content/home"
import { AddConversationContext } from "./_components/add-conversation-context"
import { AddKeywords } from "./_components/add-keywords"
import { ChatbotImages } from "./_components/chatbot-images"
import { WebsiteContentProcess } from "./_components/website-content-process"

const projects = ["genkijacs", "placement-test"]

export function generateStaticParams() {
	return projects.map((slug) => ({ project: slug }))
}

export async function generateMetadata(props: {
	params: Promise<{ project: string }>
}): Promise<Metadata> {
	const params = await props.params
	const project = homeContent.projects.find(
		(p) => p.href === `/${params.project}`,
	)

	if (!project) {
		throw new Error("Project not found")
	}

	return {
		title: project.title,
		description: project.bullets[0],
		openGraph: {
			title: `${project.title} | Joshua Kirby`,
			description: project.bullets[0],
			url: `https://joshuakirby.webcam/${params.project}`,
			images: [
				{
					url: project.image,
					width: 1200,
					height: 630,
					alt: project.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: `${project.title} | Joshua Kirby`,
			description: project.bullets[0],
			images: [project.image],
		},
	}
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
						a: (props: any) => {
							const isExternal = props.href.startsWith("https://")
							if (isExternal) {
								return (
									<a {...props} target="_blank" rel="noopener noreferrer" />
								)
							}
							return <Link {...props} />
						},
						nextimage: (props: any) => <Image {...props} />,
						addkeywords: (props: any) => <AddKeywords {...props} />,
						addconversationcontext: (props: any) => (
							<AddConversationContext {...props} />
						),
						chatbotimages: (props: any) => <ChatbotImages {...props} />,
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
