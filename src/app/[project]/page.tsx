import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import type React from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkBreaks from "remark-breaks"
import remarkGfm from "remark-gfm"
import { homeContent } from "@/content/home"
import { preprocessMarkdown } from "@/lib/preprocess-markdown"
import { cn } from "@/lib/utils"
import { AddConversationContext } from "./_components/add-conversation-context"
import { AddKeywords } from "./_components/add-keywords"
import { ChatbotImages } from "./_components/chatbot-images"
import { FanOutArchitecture } from "./_components/fan-out-architecture"
import { MacMail } from "./_components/mac-mail"
import { MacTerminal } from "./_components/mac-terminal"
import { ThemeImage } from "./_components/theme-image"
import { WebsiteContentProcess } from "./_components/website-content-process"

type StringProps<T extends React.JSXElementConstructor<any>> = {
	[key in keyof React.ComponentProps<T>]: string
}

const projects = ["genkijacs", "placement-test"]
const tagsToProcess = ["macmail", "addconversationcontext", "macterminal"]

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

	const rawMarkdown = (await import(`@/content/projects/${project}.md`)).default
	const markdown = preprocessMarkdown({
		markdown: rawMarkdown,
		tagsToProcess,
	})

	return (
		<article className="prose prose-neutral dark:prose-invert container mx-auto max-w-4xl px-4 py-20">
			<ReactMarkdown
				remarkPlugins={[remarkBreaks, remarkGfm]}
				rehypePlugins={[rehypeRaw]}
				components={
					{
						a: (props: React.ComponentProps<"a">) => {
							const isExternal = props.href?.startsWith("https://")
							if (isExternal) {
								return (
									<a {...props} target="_blank" rel="noopener noreferrer" />
								)
							}
							return <Link href={props.href || ""} {...props} />
						},
						code: ({ className, ...props }: React.ComponentProps<"code">) => {
							return (
								<code
									{...props}
									className={cn(className, "before:hidden after:hidden")}
								/>
							)
						},
						addkeywords: (props: StringProps<typeof AddKeywords>) => (
							<AddKeywords {...props} />
						),
						addconversationcontext: (
							props: StringProps<typeof AddConversationContext>,
						) => <AddConversationContext {...props} />,
						chatbotimages: (props: StringProps<typeof ChatbotImages>) => (
							<ChatbotImages {...props} images={JSON.parse(props.images)} />
						),
						websitecontentprocess: (
							props: StringProps<typeof WebsiteContentProcess>,
						) => <WebsiteContentProcess {...props} />,
						macterminal: (props: StringProps<typeof MacTerminal>) => (
							<MacTerminal {...props} />
						),
						macmail: (props: StringProps<typeof MacMail>) => (
							<MacMail {...props} />
						),
						themeimage: (props: React.ComponentProps<typeof ThemeImage>) => (
							<ThemeImage {...props} />
						),
						fanoutarchitecture: (
							props: StringProps<typeof FanOutArchitecture>,
						) => (
							<FanOutArchitecture
								{...props}
								candidates={JSON.parse(props.candidates)}
							/>
						),
					} as any
				}
			>
				{markdown}
			</ReactMarkdown>
		</article>
	)
}
