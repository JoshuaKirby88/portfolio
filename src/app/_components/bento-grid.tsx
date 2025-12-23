import {
	BriefcaseBusinessIcon,
	GraduationCapIcon,
	SmileIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { content } from "@/content/content"
import { cn } from "@/lib/utils"

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

export function BentoGrid() {
	return (
		<div className="container mx-auto max-w-4xl p-4">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-10">
				{/* Mobile: Square (1:1), Desktop: Square (1:1) - Placed first for mobile order */}
				<BentoCell className="aspect-square p-0! md:col-span-5 md:col-start-6">
					<div className="relative h-full w-full rounded-lg bg-background p-2.5">
						<div className="relative h-full w-full overflow-hidden rounded-md bg-card">
							<Image
								src="/kirby-headshot.png"
								alt="Profile picture"
								fill
								className="object-cover"
							/>
						</div>
					</div>
				</BentoCell>

				{/* Top Section: 2 cells on the left side vertically - Placed second but forced to row 1 on desktop */}
				<div className="grid h-full grid-rows-[auto_1fr] gap-4 md:col-span-5 md:row-start-1">
					<BentoCell>
						<div className="flex items-center gap-4 lg:flex-col lg:items-start">
							<div className="flex size-10 items-center justify-center rounded-md border bg-background text-muted-foreground">
								<SmileIcon className="size-5" />
							</div>
							<p className="font-bold text-lg">{content.me.name}</p>
						</div>

						<ul className="mt-3 space-y-2 lg:mt-2">
							{content.me.bullets.map((bullet) => (
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
							{content.me.links.map((link) => (
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
						{content.description.split("\n").map((line) => (
							<p
								key={line}
								className="whitespace-pre-wrap font-medium text-muted-foreground text-sm"
							>
								{line}
							</p>
						))}
					</BentoCell>
				</div>

				{/* Middle Section: 2 cells horizontally, left one wider */}
				<BentoCell className="h-64 md:col-span-6">
					<div className="flex size-10 items-center justify-center rounded-md border bg-background text-muted-foreground">
						<BriefcaseBusinessIcon className="size-5" />
					</div>
					<p className="mt-4 font-bold text-lg">
						{content.workExperience.title}
					</p>

					<ul className="mt-4 space-y-3">
						{content.workExperience.experiences.map((experience) => (
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
					<p className="mt-4 font-bold text-lg">{content.education.title}</p>

					<ul className="mt-2 space-y-2">
						{content.education.educations.map((education) => (
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

				{/* Bottom Section: 2 cells horizontally */}
				{content.projects.map((project) => (
					<BentoCell
						key={project.title}
						className="flex h-fit flex-col md:col-span-5 md:h-78"
					>
						<p className="font-bold text-lg">{project.title}</p>
						<ul className="mt-2 flex-1 space-y-1.5">
							{project.bullets.map((bullet) => (
								<li
									key={bullet}
									className="relative pl-4 font-medium text-muted-foreground text-sm"
								>
									<SmallBullet className="absolute top-[0.55em] left-0" />
									{bullet}
								</li>
							))}
						</ul>
						<Link
							href={project.path}
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
	)
}
