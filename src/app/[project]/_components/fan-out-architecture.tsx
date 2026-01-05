import { CheckIcon, SearchIcon, XIcon } from "lucide-react"
import { useId } from "react"
import { generateCycleCSS } from "@/lib/generate-cycle-css"
import { cn } from "@/lib/utils"
import { StatusBadge } from "./status-badge"
import { StatusDots } from "./status-dots"

const DURATION = 8000
const PROPORTIONS = [0.2, 0.25, 0.55]
const TRANSITION_PERCENT = 20
const ICON_TRANSITION_PERCENT = 10
const EXIT_TRANSITION_PERCENT = 10

export function FanOutArchitecture(props: {
	transcript: string
	candidates: { word: string; status: "pass" | "fail" }[]
}) {
	const id = useId().replaceAll(":", "")
	const wordsPattern = props.candidates
		.map((c) => c.word.replace(/[.*+?^${}()|[\\]/g, "\\$&"))
		.join("|")
	const regex = new RegExp(`\\b(${wordsPattern})\\b`, "gi")
	const parts = props.transcript.split(regex)

	const highlightStyles = generateCycleCSS({
		componentId: `h-${id}`,
		duration: DURATION,
		proportions: PROPORTIONS,
		accumulate: true,
		transitionPercent: TRANSITION_PERCENT,
		exitTransitionPercent: EXIT_TRANSITION_PERCENT,
		on: "text-decoration-line: underline; text-decoration-color: var(--color-foreground); font-weight: 500;",
		off: "text-decoration-line: underline; text-decoration-color: transparent; font-weight: 400;",
	})

	const cardStyles = generateCycleCSS({
		componentId: `card-${id}`,
		duration: DURATION,
		proportions: PROPORTIONS,
		accumulate: true,
		transitionPercent: TRANSITION_PERCENT,
		exitTransitionPercent: EXIT_TRANSITION_PERCENT,
		on: "opacity: 1; transform: translateY(0) scale(1); filter: blur(0);",
		off: "opacity: 0; transform: translateY(-12px) scale(0.98); filter: blur(4px);",
	})

	const iconStyles = generateCycleCSS({
		componentId: `icon-${id}`,
		duration: DURATION,
		proportions: PROPORTIONS,
		accumulate: true,
		transitionPercent: ICON_TRANSITION_PERCENT,
		exitTransitionPercent: EXIT_TRANSITION_PERCENT,
		on: "opacity: 1; transform: scale(1); filter: blur(0);",
		off: "opacity: 0; transform: scale(0.7); filter: blur(4px);",
	})

	return (
		<div className="relative flex w-full flex-col items-center justify-center rounded-xl border bg-card p-3 pt-14 text-sm md:p-8">
			<style>{highlightStyles}</style>
			<style>{cardStyles}</style>
			<style>{iconStyles}</style>
			<StatusBadge
				duration={DURATION}
				proportions={PROPORTIONS}
				steps={["Search Pattern", "Found Candidates", "Verify Candidates"]}
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

			{/*Search Badge*/}
			<div className="flex items-center rounded-full border bg-background px-1.5 py-0.5 text-muted-foreground text-xs">
				<SearchIcon className="mr-1 size-4" />
				Past Tense
			</div>

			{/* Transcript Card */}
			<div className="mt-2 rounded-lg border bg-background px-3 py-2 text-sm leading-relaxed">
				{parts.map((part, index) => {
					const candidate = props.candidates.find(
						(c) => c.word.toLowerCase() === part.toLowerCase(),
					)

					if (!candidate) {
						return <span key={index}>{part}</span>
					}

					return (
						<span
							key={index}
							className={cn(`a-h-${id}-1`, "rounded-sm first:ml-0 last:mr-0")}
						>
							{part}
						</span>
					)
				})}
			</div>

			{/* Fan Out Lanes */}
			<div className="mt-7 grid grid-cols-1 gap-10 md:grid-cols-3">
				{props.candidates.map((candidate, i) => {
					const isPass = candidate.status === "pass"
					const Icon = isPass ? CheckIcon : XIcon
					return (
						<div key={i} className={cn(`a-card-${id}-1`, "space-y-2")}>
							<div
								className={cn(
									"flex flex-col gap-3 rounded-lg border px-3 py-1.5 text-center font-semibold",
									"bg-background",
								)}
							>
								"{candidate.word}"
							</div>

							<div
								className={cn(
									`a-icon-${id}-2`,
									"mx-auto flex size-5 items-center justify-center rounded-full",
									isPass ? "bg-blue-500 text-white" : "bg-red-500 text-white",
								)}
							>
								<Icon className="size-3.5 stroke-3" />
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
