import { useId } from "react"
import { StatusDots } from "@/app/[project]/_components/status-dots"
import { cn } from "@/lib/utils"
import { StatusBadge } from "./status-badge"

const DURATION = 8000
const DOT_PROPORTIONS = [0.2, 0.8]
const KEYWORD_START = 0.2
const KEYWORD_END = 0.7
const KEYWORD_TRANSITION_PROPORTION = 0.1

export const AddKeywords = (props: { original: string; keywords: string }) => {
	const componentId = useId().replaceAll(":", "")
	const keywords = props.keywords
		.split(",")
		.map((word) => word.trim())
		.filter(Boolean)

	const keyframesStyles = keywords
		.map((_, i) => {
			const delayPercent =
				KEYWORD_START * 100 +
				(((KEYWORD_END - KEYWORD_START) * i) / keywords.length) * 100
			return `.a-${componentId}-${i} { animation: k-${componentId}-${i} ${DURATION}ms linear infinite; }
@keyframes k-${componentId}-${i} {
    0%, ${delayPercent}% { opacity: 0; transform: translateY(4px); }
    ${delayPercent + KEYWORD_TRANSITION_PROPORTION * 100}%, 95% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; }
}`
		})
		.join("\n")

	return (
		<div className="relative block overflow-hidden rounded-xl border bg-card p-4 text-sm">
			<style>{keyframesStyles}</style>

			<StatusDots
				duration={DURATION}
				proportions={DOT_PROPORTIONS}
				className="absolute top-4 right-4"
			/>

			<StatusBadge
				className="mb-3"
				duration={DURATION}
				proportions={DOT_PROPORTIONS}
				steps={["Original", "Rephrased"]}
			/>

			<div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 px-2 text-sm leading-relaxed">
				<div>{props.original}</div>

				<div className="inline-flex flex-wrap items-baseline gap-x-2 gap-y-1">
					{keywords.map((keyword, i) => {
						return (
							<div
								key={keyword}
								className={cn(
									`a-${componentId}-${i}`,
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
