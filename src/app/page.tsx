import { BentoGrid } from "@/app/_components/bento-grid"
import { content } from "@/content/content"

export default function Page() {
	return (
		<div>
			<h1 className="mt-20 mb-10 whitespace-pre-wrap text-center font-semibold text-2xl">
				{content.tagline}
			</h1>

			<BentoGrid />
		</div>
	)
}
