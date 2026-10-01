import {
	ArrowRightIcon,
	CodeXmlIcon,
	GraduationCapIcon,
	SmileIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { buttonVariants } from "@/components/ui/button"
import { homeContent } from "@/content/home"
import { caseStudies } from "@/content/work"
import { cn } from "@/lib/utils"

export default function Page() {
	const featuredWork = caseStudies.filter((project) =>
		homeContent.featuredWork.includes(project.slug),
	)

	return (
		<main>
			<h1 className="mt-30 mb-10 whitespace-pre-wrap text-center font-semibold text-2xl">
				{homeContent.tagline}
			</h1>

			<div className="container mx-auto max-w-4xl p-4">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-10">
					<BentoCell className="aspect-square p-0! md:aspect-auto md:col-span-5 md:col-start-6">
						<div className="relative h-full w-full rounded-lg bg-background p-2.5">
							<div className="relative h-full w-full overflow-hidden rounded-md">
								<Image
									src="/headshot.webp"
									alt="Joshua Kirby"
									fill
									priority
									sizes="(min-width: 1024px) 512px, (min-width: 768px) 50vw, 100vw"
									className="bg-card object-cover"
								/>
							</div>
						</div>
					</BentoCell>

					<div className="grid h-full grid-rows-[auto_1fr] gap-4 md:col-span-5 md:row-start-1">
						<BentoCell>
							<div className="flex items-center gap-4 lg:flex-col lg:items-start">
								<div className="flex size-10 items-center justify-center rounded-md border bg-background text-muted-foreground">
									<SmileIcon className="size-5" />
								</div>
								<p className="font-bold text-lg">{homeContent.me.name}</p>
							</div>

							<ul className="mt-4 space-y-2 lg:mt-2">
								{homeContent.me.bullets.map((bullet) => (
									<li
										key={bullet}
										className="relative pl-4 font-medium text-muted-foreground text-sm"
									>
										<SmallBullet className="absolute top-[0.55em] left-0" />
										{bullet}
									</li>
								))}
							</ul>

							<div className="mt-4 -mr-2 -mb-2 flex items-end justify-end space-x-2 font-medium text-muted-foreground">
								{homeContent.me.links.map((link) => (
									<Link
										key={link.name}
										href={link.href}
										download={link.download}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center space-x-1 rounded-full border bg-background px-3 py-0.5 text-sm hover:underline"
									>
										<link.icon className="size-3.5" />
										<span>{link.name}</span>
									</Link>
								))}
							</div>
						</BentoCell>

						{homeContent.education.educations.map((education) => (
							<BentoCell key={education.name} className="h-full">
								<div className="flex items-center gap-4">
									<div className="flex size-10 shrink-0 items-center justify-center rounded-md border bg-background text-muted-foreground">
										<GraduationCapIcon className="size-5" />
									</div>
									<h2 className="font-bold text-lg">{education.name}</h2>
								</div>
								<ul className="mt-4 space-y-1">
									{education.bullets.map((bullet) => (
										<li
											key={bullet}
											className="relative pl-4 font-medium text-muted-foreground text-sm"
										>
											<SmallBullet className="absolute top-[0.55em] left-0" />
											{bullet}
										</li>
									))}
								</ul>
							</BentoCell>
						))}
					</div>

					<section
						aria-label="Selected work"
						className="grid gap-4 md:col-span-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
					>
						{featuredWork.map((project) => (
							<BentoCell
								key={project.slug}
								className="flex flex-col p-4! lg:p-5! first:md:row-span-2"
							>
								<h2 className="font-bold text-lg">{project.title}</h2>
								<ul className="mt-4 flex-1 space-y-2">
									{project.bullets.map((bullet) => (
										<li
											key={bullet}
											className="relative pl-4 font-medium text-muted-foreground text-sm"
										>
											<SmallBullet className="absolute top-[0.55em] left-0" />
											<ReactMarkdown>{bullet}</ReactMarkdown>
										</li>
									))}
								</ul>
								<Link
									href={`/projects/${project.slug}`}
									aria-label={`Read ${project.title} case study`}
									className={cn(
										buttonVariants(),
										"mt-5 ml-auto w-fit rounded-xl border-2 border-ring px-3.5 py-4.5",
									)}
								>
									Read Case Study
								</Link>
							</BentoCell>
						))}
					</section>
					<BentoCell className="flex items-center justify-between gap-4 py-4 md:col-span-10 lg:py-4">
						<p className="font-bold text-lg">More of my work</p>
						<Link
							href="/projects"
							aria-label="View all work"
							className={cn(
								buttonVariants({ variant: "outline" }),
								"rounded-xl px-3.5 py-4.5",
							)}
						>
							View all work
							<ArrowRightIcon className="size-4" aria-hidden="true" />
						</Link>
					</BentoCell>
				</div>
			</div>

			<p className="mt-20 mb-10 text-center text-muted-foreground text-xs">
				<Link
					href="https://github.com/JoshuaKirby88/portfolio"
					className={cn(
						buttonVariants({ variant: "link" }),
						"text-muted-foreground",
					)}
					target="_blank"
					rel="noopener noreferrer"
				>
					<CodeXmlIcon className="size-3.5" />
					View site source
				</Link>
			</p>
		</main>
	)
}

function BentoCell({
	className,
	children,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"relative overflow-hidden rounded-xl border bg-card p-5 lg:p-6",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	)
}

function SmallBullet({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("size-1.5 rounded-full bg-ring", className)}
			{...props}
		/>
	)
}
