import { readFile } from "node:fs/promises"
import { join } from "node:path"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown, { type Components } from "react-markdown"
import rehypeRaw from "rehype-raw"
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
import { WhisperAttack } from "./_components/whisper-attack-lazy"

const projects = ["genkijacs", "placement-test", "attacking-whisper"]
const tagsToProcess = ["macmail", "addconversationcontext", "macterminal"]

export const dynamicParams = false

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
		notFound()
	}

	return {
		title: project.title,
		description: project.description,
		openGraph: {
			title: `${project.title} | Joshua Kirby`,
			description: project.description,
			url: `https://joshuakirby.dev/${params.project}`,
			images: [
				{
					url: project.image,
					width: project.imageWidth,
					height: project.imageHeight,
					alt: project.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: `${project.title} | Joshua Kirby`,
			description: project.description,
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

	const rawMarkdown = await readFile(
		join(process.cwd(), "src", "content", "projects", `${project}.md`),
		"utf8",
	)
	const markdown = preprocessMarkdown({
		markdown: rawMarkdown,
		tagsToProcess,
	})

	return (
		<article className="prose prose-neutral dark:prose-invert container mx-auto max-w-4xl px-4 py-20 [&_h3]:mt-10">
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeRaw]}
				components={markdownComponents}
			>
				{markdown}
			</ReactMarkdown>
		</article>
	)
}

const markdownComponents = {
	whisperattack: ({ source, target }) => (
		<WhisperAttack source={source} target={target} />
	),
	a: (props) => {
		const isExternal = props.href?.startsWith("https://")
		if (isExternal) {
			return <a {...props} target="_blank" rel="noopener noreferrer" />
		}
		return <Link href={props.href || ""} {...props} />
	},
	code: ({ className, ...props }) => (
		<code {...props} className={cn(className, "before:hidden after:hidden")} />
	),
	addkeywords: ({ original, keywords }) => (
		<AddKeywords original={original} keywords={keywords} />
	),
	addconversationcontext: ({ rephrased, children }) => (
		<AddConversationContext rephrased={rephrased}>
			{children}
		</AddConversationContext>
	),
	chatbotimages: ({ images }) => <ChatbotImages images={parseJson(images)} />,
	websitecontentprocess: (props) => <WebsiteContentProcess {...props} />,
	macterminal: ({ children, className }) => (
		<MacTerminal className={className}>{children}</MacTerminal>
	),
	macmail: ({ to, from, subject, children, className }) => (
		<MacMail to={to} from={from} subject={subject} className={className}>
			{children}
		</MacMail>
	),
	themeimage: ({ src, alt, width, height, sizes, className, caption }) => (
		<ThemeImage
			src={src}
			alt={alt}
			width={Number(width)}
			height={Number(height)}
			sizes={sizes}
			className={className}
			caption={caption}
		/>
	),
	fanoutarchitecture: ({ transcript, candidates }) => (
		<FanOutArchitecture
			transcript={transcript}
			candidates={parseJson(candidates)}
		/>
	),
} satisfies Components

function parseJson<T>(value: string): T {
	return JSON.parse(value) as T
}
