import { useId } from "react"
import { StatusDots } from "@/app/[project]/_components/status-dots"
import { generateCycleCSS } from "@/lib/generate-cycle-css"
import { cn } from "@/lib/utils"
import { StatusBadge } from "./status-badge"

const DURATION = 8000
const PROPORTIONS = [0.2, 0.8]
const TRANSITION_PERCENT = 10
const EXIT_TRANSITION_PERCENT = 10

export const AddKeywords = (props: { original: string; keywords: string }) => {
	const componentId = useId().replaceAll(":", "")
	const keywords = props.keywords
		.split(",")
		.map((word) => word.trim())
		.filter(Boolean)

	const keywordProportions = [
		PROPORTIONS[0],
		...keywords.map(() => (PROPORTIONS[1] - PROPORTIONS[0]) / keywords.length),
	]

	const keyframesStyles = generateCycleCSS({
		componentId,
		duration: DURATION,
		proportions: keywordProportions,
		accumulate: true,
		transitionPercent: TRANSITION_PERCENT,
		exitTransitionPercent: EXIT_TRANSITION_PERCENT,
		on: "opacity: 1; transform: translateY(0); filter: blur(0px);",
		off: "opacity: 0; transform: translateY(4px); filter: blur(4px);",
	})

	return (
		<div className="relative my-10 block overflow-hidden rounded-xl border bg-card p-4 text-sm">
			<style>{keyframesStyles}</style>

			<StatusDots
				duration={DURATION}
				proportions={PROPORTIONS}
				transitionPercent={TRANSITION_PERCENT}
				exitTransitionPercent={EXIT_TRANSITION_PERCENT}
				className="absolute top-4 right-4"
			/>

			<StatusBadge
				duration={DURATION}
				proportions={PROPORTIONS}
				steps={["Original", "Rephrased"]}
				transitionPercent={TRANSITION_PERCENT}
				exitTransitionPercent={EXIT_TRANSITION_PERCENT}
				className="mb-3"
			/>

			<div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 px-2 text-sm leading-relaxed">
				<div>{props.original}</div>

				<div className="inline-flex flex-wrap items-baseline gap-x-2 gap-y-1">
					{keywords.map((keyword, i) => {
						return (
							<div
								key={keyword}
								className={cn(
									`a-${componentId}-${i + 1}`,
									"inline-flex items-baseline font-semibold",
								)}
							>
								{keyword}
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
