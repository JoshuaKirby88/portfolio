import { ArrowRightIcon, HouseIcon } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
} from "@/components/ui/breadcrumb"
import { projects } from "@/content/projects"

const description = "AI products and research by Joshua Kirby."

export const metadata: Metadata = {
	title: "Projects",
	description,
	alternates: { canonical: "/projects" },
	openGraph: {
		title: "Projects | Joshua Kirby",
		description,
		url: "/projects",
	},
	twitter: {
		title: "Projects | Joshua Kirby",
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
				<h1 className="mt-8 font-semibold text-3xl">Projects</h1>
			</header>
			<ul className="space-y-4">
				{projects.map((project) => (
					<li key={project.slug}>
						<Link
							href={`/projects/${project.slug}`}
							className="group grid overflow-hidden rounded-xl border bg-card transition-colors hover:border-muted-foreground/40 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4 sm:grid-cols-[2fr_3fr]"
						>
							<div className="flex items-center border-b bg-white sm:border-r sm:border-b-0">
								<Image
									src={project.image}
									alt=""
									width={project.imageWidth}
									height={project.imageHeight}
									sizes="(min-width: 896px) 346px, (min-width: 640px) 40vw, 100vw"
									className="h-auto w-full"
								/>
							</div>
							<div className="flex flex-col p-5 lg:p-6">
								<h2 className="font-semibold text-lg">{project.title}</h2>
								<p className="mt-2 text-muted-foreground text-sm/6">
									{project.description}
								</p>
								<span className="mt-5 inline-flex items-center gap-2 self-end text-sm group-hover:underline">
									Read case study
									<ArrowRightIcon className="size-4" aria-hidden="true" />
								</span>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</main>
	)
}
