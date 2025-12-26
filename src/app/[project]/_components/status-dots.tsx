import { useId } from "react"
import { getOnOffCycleCSS } from "@/lib/get-on-off-cycle-css"
import { cn } from "@/lib/utils"

export function StatusDots(props: {
	duration: number
	proportions: number[]
	className?: string
}) {
	const componentId = useId().replaceAll(":", "")
	const style = getOnOffCycleCSS({
		componentId,
		duration: props.duration,
		proportions: props.proportions,
		on: "{ background-color: var(--primary); }",
		off: "{ background-color: color-mix(in srgb, var(--muted-foreground), transparent 80%); }",
	})
	return (
		<div className={cn("flex gap-1.5", props.className)}>
			<style>{style}</style>

			{props.proportions.map((_, i) => (
				<div
					key={i}
					className={cn("size-1.5 rounded-full", `a-${componentId}-${i}`)}
				/>
			))}
		</div>
	)
}
