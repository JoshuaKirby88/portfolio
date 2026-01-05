import {
	BriefcaseBusinessIcon,
	GithubIcon,
	GraduationCapIcon,
	SmileIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { buttonVariants } from "@/components/ui/button"
import { homeContent } from "@/content/home"
import { cn } from "@/lib/utils"

export default function Page() {
	return (
		<div>
			<h1 className="mt-30 mb-10 whitespace-pre-wrap text-center font-semibold text-2xl">
				{homeContent.tagline}
			</h1>

			<div className="container mx-auto max-w-4xl p-4">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-10">
					<BentoCell className="aspect-square p-0! md:col-span-5 md:col-start-6">
						<div className="relative h-full w-full rounded-lg bg-background p-2.5">
							<div className="relative h-full w-full overflow-hidden rounded-md">
								<Image
									src="/headshot.webp"
									alt="Profile picture"
									fill
									priority
									unoptimized
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
										className="flex items-center space-x-1 rounded-full border bg-background px-3 py-0.5 text-sm hover:underline"
									>
										<link.icon className="size-3.5" />
										<span>{link.name}</span>
									</Link>
								))}
							</div>
						</BentoCell>

						<BentoCell className="h-full space-y-1.5">
							{homeContent.description.split("\n").map((line) => (
								<p
									key={line}
									className="whitespace-pre-wrap font-medium text-muted-foreground text-sm"
								>
									{line}
								</p>
							))}
						</BentoCell>
					</div>

					<BentoCell className="h-64 md:col-span-6">
						<div className="flex size-10 items-center justify-center rounded-md border bg-background text-muted-foreground">
							<BriefcaseBusinessIcon className="size-5" />
						</div>
						<p className="mt-4 font-bold text-lg">
							{homeContent.workExperience.title}
						</p>

						<ul className="mt-4 space-y-3">
							{homeContent.workExperience.experiences.map((experience) => (
								<li key={experience.name} className="relative space-y-0.5 pl-5">
									<BigBullet className="absolute top-[0.55em] left-0" />
									<div className="flex items-baseline">
										<p className="font-semibold">{experience.name}</p>
										<p className="ml-auto font-medium text-muted-foreground text-sm">
											{experience.duration}
										</p>
									</div>

									<p className="font-medium text-muted-foreground text-sm">
										{experience.description}
									</p>
								</li>
							))}
						</ul>
					</BentoCell>
					<BentoCell className="h-64 md:col-span-4">
						<div className="flex size-10 items-center justify-center rounded-md border bg-background text-muted-foreground">
							<GraduationCapIcon className="size-5" />
						</div>
						<p className="mt-4 font-bold text-lg">
							{homeContent.education.title}
						</p>

						<ul className="mt-4 space-y-2">
							{homeContent.education.educations.map((education) => (
								<li key={education.name}>
									<p className="font-semibold">{education.name}</p>
									<ul className="mt-2 space-y-1">
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
								</li>
							))}
						</ul>
					</BentoCell>

					{homeContent.projects.map((project) => (
						<BentoCell
							key={project.title}
							className="flex h-fit flex-col md:col-span-5 md:h-82"
						>
							<p className="font-bold text-lg">{project.title}</p>
							<ul className="mt-4 flex-1 space-y-1.5">
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
								href={project.href}
								prefetch
								className={cn(
									buttonVariants(),
									"mt-2 ml-auto w-fit rounded-xl border-2 border-ring px-3.5 py-4.5",
								)}
							>
								View
							</Link>
						</BentoCell>
					))}
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
				>
					<GithubIcon className="size-3.5" />
					View site source
				</Link>
			</p>
		</div>
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

function BigBullet({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"mr-3 size-2 rounded-full bg-ring ring-2 ring-border ring-offset-1 ring-offset-card",
				className,
			)}
			{...props}
		/>
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
