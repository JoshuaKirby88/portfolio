import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { HouseIcon } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown, { type Components } from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { caseStudies } from "@/content/work"
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

const tagsToProcess = ["macmail", "addconversationcontext", "macterminal"]

export const dynamicParams = false

export function generateStaticParams() {
	return caseStudies.map(({ slug }) => ({ project: slug }))
}

export async function generateMetadata(props: {
	params: Promise<{ project: string }>
}): Promise<Metadata> {
	const params = await props.params
	const project = caseStudies.find((p) => p.slug === params.project)

	if (!project) {
		notFound()
	}

	return {
		title: project.title,
		description: project.description,
		alternates: { canonical: `/projects/${project.slug}` },
		openGraph: {
			title: `${project.title} | Joshua Kirby`,
			description: project.description,
			url: `https://joshuakirby.dev/projects/${project.slug}`,
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

	if (!caseStudies.some((p) => p.slug === project)) {
		notFound()
	}

	const rawMarkdown = await readFile(
		join(process.cwd(), "src", "content", "projects", `${project}.md`),
		"utf8",
	)
	const titleMatch = /^## ([^\r\n]+)\r?\n/.exec(rawMarkdown)
	if (!titleMatch) {
		throw new Error(`Missing case study title in ${project}.md`)
	}
	const markdown = preprocessMarkdown({
		markdown: rawMarkdown.slice(titleMatch[0].length),
		tagsToProcess,
	})

	return (
		<article className="prose prose-neutral dark:prose-invert container mx-auto max-w-4xl px-4 py-20 [&_h3]:mt-10">
			<header className="not-prose mb-8">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink
								render={<Link href="/" />}
								className="inline-flex items-center gap-1.5"
							>
								<HouseIcon className="size-3.5" aria-hidden="true" />
								Home
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink render={<Link href="/projects" />}>
								My Work
							</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<h1 className="mt-8 font-semibold text-3xl">{titleMatch[1]}</h1>
			</header>
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
