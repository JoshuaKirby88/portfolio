import { ArrowDown, ArrowUp, HashIcon, Link as LinkIcon } from "lucide-react"
import { useId } from "react"
import { StatusDots } from "@/app/[project]/_components/status-dots"
import { generateCycleCSS } from "@/lib/generate-cycle-css"
import { cn } from "@/lib/utils"
import { StatusBadge } from "./status-badge"

const DURATION = 8000
const PROPORTIONS = [0.2, 0.25, 0.55]
const TRANSITION_PERCENT = 15
const EXIT_TRANSITION_PERCENT = 15

export function WebsiteContentProcess(props: {
	url: string
	match: string
	topneighbour: string
	bottomneighbour: string
}) {
	const componentId = useId().replaceAll(":", "")
	const neighborProportions = [PROPORTIONS[0], 1 - PROPORTIONS[0]]

	const neighborStyle = generateCycleCSS({
		componentId: `${componentId}-neighbor`,
		duration: DURATION,
		proportions: neighborProportions,
		transitionPercent: TRANSITION_PERCENT,
		exitTransitionPercent: EXIT_TRANSITION_PERCENT,
		on: "opacity: 1; transform: translateY(0) scale(1); filter: blur(0px);",
		off: "opacity: 0; transform: translateY(12px) scale(0.98); filter: blur(2px);",
	})

	const neighborDownStyle = generateCycleCSS({
		componentId: `${componentId}-neighbor-down`,
		duration: DURATION,
		proportions: neighborProportions,
		transitionPercent: TRANSITION_PERCENT,
		exitTransitionPercent: EXIT_TRANSITION_PERCENT,
		on: "opacity: 1; transform: translateY(0) scale(1); filter: blur(0px);",
		off: "opacity: 0; transform: translateY(-12px) scale(0.98); filter: blur(2px);",
	})

	const connectorStyle = generateCycleCSS({
		componentId: `${componentId}-connector`,
		duration: DURATION,
		proportions: neighborProportions,
		transitionPercent: TRANSITION_PERCENT,
		exitTransitionPercent: EXIT_TRANSITION_PERCENT,
		on: "opacity: 1; scale(1); filter: blur(0px);",
		off: "opacity: 0; scale(0.98); filter: blur(2px);",
	})

	const contentProportions = [
		PROPORTIONS[0] + PROPORTIONS[1],
		1 - (PROPORTIONS[0] + PROPORTIONS[1]),
	]

	const contentStyle = generateCycleCSS({
		componentId: `${componentId}-content`,
		duration: DURATION,
		proportions: contentProportions,
		transitionPercent: TRANSITION_PERCENT,
		exitTransitionPercent: EXIT_TRANSITION_PERCENT,
		on: "opacity: 1; scale(1); filter: blur(0px);",
		off: "opacity: 0; scale(0.98); filter: blur(2px);",
	})

	return (
		<div className="relative flex w-full flex-col items-center justify-center space-y-2 rounded-xl border bg-card p-3 pt-14 text-sm md:p-8">
			<style>
				{neighborStyle}
				{neighborDownStyle}
				{connectorStyle}
				{contentStyle}
			</style>

			<StatusBadge
				duration={DURATION}
				proportions={PROPORTIONS}
				steps={["Found Match", "Expand Neighbours", "Fetch Text"]}
				transitionPercent={TRANSITION_PERCENT}
				exitTransitionPercent={EXIT_TRANSITION_PERCENT}
				className="absolute top-4 left-4"
			/>

			<StatusDots
				duration={DURATION}
				proportions={PROPORTIONS}
				transitionPercent={TRANSITION_PERCENT}
				exitTransitionPercent={EXIT_TRANSITION_PERCENT}
				className="absolute top-4 right-4"
			/>

			<ChunkCard
				url={props.url}
				index={2}
				content={props.topneighbour}
				className={cn(`a-${componentId}-neighbor-1`, "opacity-0")}
				metaClassName={`a-${componentId}-content-0`}
				textClassName={cn(`a-${componentId}-content-1`, "opacity-0")}
			/>

			<div
				className={cn(
					`a-${componentId}-connector-1`,
					"opacity-0",
					"flex h-4 flex-col items-center text-muted-foreground/50",
				)}
			>
				<ArrowUp className="size-4" />
			</div>

			<ChunkCard
				url={props.url}
				index={3}
				content={props.match}
				metaClassName={`a-${componentId}-content-0`}
				textClassName={cn(`a-${componentId}-content-1`, "opacity-0")}
			/>

			<div
				className={cn(
					`a-${componentId}-connector-1`,
					"opacity-0",
					"flex h-4 flex-col items-center text-muted-foreground/50",
				)}
			>
				<ArrowDown className="size-4" />
			</div>

			<ChunkCard
				url={props.url}
				index={4}
				content={props.bottomneighbour}
				className={cn(`a-${componentId}-neighbor-down-1`, "opacity-0")}
				metaClassName={`a-${componentId}-content-0`}
				textClassName={cn(`a-${componentId}-content-1`, "opacity-0")}
			/>
		</div>
	)
}

function ChunkCard(props: {
	url: string
	index: number
	content: string
	className?: string
	metaClassName?: string
	textClassName?: string
}) {
	return (
		<div
			className={cn(
				"grid h-fit w-full max-w-[320px] grid-cols-1 rounded-xl border bg-background p-3 font-medium text-xs",
				props.className,
			)}
		>
			<div
				className={cn(
					"col-start-1 row-start-1 flex flex-col justify-center gap-1.5",
					props.metaClassName,
				)}
			>
				<div className="flex items-center gap-2">
					<LinkIcon className="size-3" />
					<div>{props.url}</div>
				</div>
				<div className="flex items-center gap-2">
					<HashIcon className="size-3" />
					<div>{props.index}</div>
				</div>
			</div>

			<div
				className={cn(
					"col-start-1 row-start-1 leading-relaxed",
					props.textClassName,
				)}
			>
				{props.content}
			</div>
		</div>
	)
}
