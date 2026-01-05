import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import React from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkBreaks from "remark-breaks"
import remarkGfm from "remark-gfm"
import { homeContent } from "@/content/home"
import { cn } from "@/lib/utils"
import { AddConversationContext } from "./_components/add-conversation-context"
import { AddKeywords } from "./_components/add-keywords"
import { ChatbotImages } from "./_components/chatbot-images"
import { FanOutArchitecture } from "./_components/fan-out-architecture"
import { MacMail } from "./_components/mac-mail"
import { MacTerminal } from "./_components/mac-terminal"
import { ThemeImage } from "./_components/theme-image"
import { WebsiteContentProcess } from "./_components/website-content-process"

const projects = ["genkijacs", "placement-test"]
const codeBlockLanguages = { macterminal: "macterminal", macmail: "macmail" }

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
				remarkPlugins={[remarkBreaks, remarkGfm]}
				rehypePlugins={[rehypeRaw]}
				components={
					{
						p: (props: React.ComponentProps<"p">) => {
							const hasBlock = React.Children.toArray(props.children).some(
								(child) =>
									React.isValidElement(child) && typeof child.type !== "string",
							)
							if (hasBlock) {
								return <div {...props} />
							}
							return <p {...props} />
						},
						a: (props: React.ComponentProps<"a">) => {
							const isExternal = props.href?.startsWith("https://")
							if (isExternal) {
								return (
									<a {...props} target="_blank" rel="noopener noreferrer" />
								)
							}
							return <Link href={props.href || ""} {...props} />
						},
						pre: ({
							node,
							...props
						}: React.ComponentProps<"pre"> & { node?: any }) => {
							const firstChild = node?.children?.[0]
							if (
								firstChild &&
								firstChild.type === "element" &&
								firstChild.tagName === "code" &&
								Object.values(codeBlockLanguages).some((lang) =>
									firstChild.properties?.className?.includes(
										`language-${lang}`,
									),
								)
							) {
								return props.children
							}
							return <pre {...props} />
						},
						code: ({
							inline,
							className,
							...props
						}: React.ComponentProps<"code"> & { inline?: boolean }) => {
							const match = /language-(\w+)/.exec(className || "")
							if (!inline && match) {
								if (match[1] === codeBlockLanguages.macterminal) {
									return <MacTerminal>{props.children}</MacTerminal>
								}
								if (match[1] === codeBlockLanguages.macmail) {
									return <MacMail>{props.children}</MacMail>
								}
							}
							return (
								<code
									className={cn(className, "before:hidden after:hidden")}
									{...props}
								/>
							)
						},
						addkeywords: (props: React.ComponentProps<typeof AddKeywords>) => (
							<AddKeywords {...props} />
						),
						addconversationcontext: (
							props: React.ComponentProps<typeof AddConversationContext>,
						) => <AddConversationContext {...props} />,
						chatbotimages: (
							props: React.ComponentProps<typeof ChatbotImages>,
						) => <ChatbotImages {...props} />,
						websitecontentprocess: (
							props: React.ComponentProps<typeof WebsiteContentProcess>,
						) => <WebsiteContentProcess {...props} />,
						themeimage: (props: React.ComponentProps<typeof ThemeImage>) => (
							<ThemeImage {...props} />
						),
						fanoutarchitecture: (
							props: React.ComponentProps<typeof FanOutArchitecture>,
						) => <FanOutArchitecture {...props} />,
					} as any
				}
			>
				{markdown}
			</ReactMarkdown>
		</article>
	)
}
