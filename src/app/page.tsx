import { GithubIcon } from "lucide-react"
import Link from "next/link"
import { BentoGrid } from "@/app/_components/bento-grid"
import { buttonVariants } from "@/components/ui/button"
import { homeContent } from "@/content/home-content"
import { cn } from "@/lib/utils"

export default function Page() {
	return (
		<div>
			<h1 className="mt-20 mb-10 whitespace-pre-wrap text-center font-semibold text-2xl">
				{homeContent.tagline}
			</h1>

			<BentoGrid />

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
