import { useId } from "react"
import { Badge } from "@/components/ui/badge"
import { generateCycleCSS } from "@/lib/generate-cycle-css"
import { cn } from "@/lib/utils"

export const StatusBadge = (props: {
	steps: string[]
	duration: number
	proportions: number[]
	transitionPercent: number
	exitTransitionPercent?: number
	className?: string
}) => {
	const componentId = useId().replaceAll(":", "")
	const style = generateCycleCSS({
		componentId,
		duration: props.duration,
		proportions: props.proportions,
		transitionPercent: props.transitionPercent,
		exitTransitionPercent: props.exitTransitionPercent,
		on: "opacity: 1; transform: scale(1); filter: blur(0);",
		off: "opacity: 0; transform: scale(0.9); filter: blur(4px);",
	})

	return (
		<div className={cn("grid grid-cols-1", props.className)}>
			<style>{style}</style>

			{props.steps.map((step, i) => (
				<Badge
					key={step}
					variant={
						i === 0
							? "outline"
							: i === props.steps.length - 1
								? "default"
								: "brand"
					}
					className={cn(
						`a-${componentId}-${i}`,
						"col-start-1 row-start-1 w-fit backdrop-blur-sm",
					)}
				>
					{step}
				</Badge>
			))}
		</div>
	)
}
