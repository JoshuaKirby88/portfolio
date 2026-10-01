import { HouseIcon } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
} from "@/components/ui/breadcrumb"
import {
	Timeline,
	TimelineContent,
	TimelineDot,
	TimelineItem,
} from "@/components/timeline"
import { work } from "@/content/work"

const description = "Research, products, and internships by Joshua Kirby."

export const metadata: Metadata = {
	title: "My Work",
	description,
	alternates: { canonical: "/projects" },
	openGraph: {
		title: "My Work | Joshua Kirby",
		description,
		url: "/projects",
	},
	twitter: {
		title: "My Work | Joshua Kirby",
		description,
	},
}

export default function Page() {
	return (
		<main className="container mx-auto max-w-4xl px-4 py-20">
			<header className="mb-8">
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
					</BreadcrumbList>
				</Breadcrumb>
				<h1 className="mt-8 font-semibold text-3xl">My Work</h1>
			</header>
			<Timeline>
				{work.map((entry) => (
					<TimelineItem key={entry.title}>
						<TimelineDot />
						<TimelineContent>
							<p className="mb-2 text-xs/5 text-muted-foreground">
								{entry.dates}
							</p>
							<WorkCard entry={entry} />
						</TimelineContent>
					</TimelineItem>
				))}
			</Timeline>
		</main>
	)
}

function WorkCard({ entry }: { entry: (typeof work)[number] }) {
	const className =
		"grid gap-5 rounded-xl border bg-card p-5 has-[img]:sm:grid-cols-[minmax(0,1fr)_228px] sm:items-center sm:gap-8"
	const content = (
		<>
			<div>
				<h2 className="font-semibold text-lg leading-snug group-hover:underline group-hover:underline-offset-4">
					{entry.title}
				</h2>
				<p className="mt-3 max-w-prose text-muted-foreground text-sm/6">
					{entry.description}
				</p>
			</div>
			{"previewImage" in entry && (
				<Image
					src={entry.previewImage}
					alt=""
					width={1200}
					height={675}
					sizes="(min-width: 640px) 228px, 100vw"
					className="block h-auto w-full rounded-md border"
				/>
			)}
		</>
	)
	return "slug" in entry ? (
		<Link
			href={`/projects/${entry.slug}`}
			className={`${className} group transition-colors hover:border-muted-foreground/50 hover:bg-muted/30 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4`}
		>
			{content}
		</Link>
	) : (
		<div className={className}>{content}</div>
	)
}
