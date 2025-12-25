import type * as React from "react"
import { useId } from "react"
import { getOnOffCycleCSS } from "@/lib/get-on-off-cycle-css"
import { cn } from "@/lib/utils"
import { Badge } from "./ui/badge"

export function StatusBadge(props: {
	steps: string[]
	duration: number
	proportions: number[]
	className?: string
}) {
	const componentId = useId().replaceAll(":", "")
	const style = getOnOffCycleCSS({
		componentId,
		duration: props.duration,
		proportions: props.proportions,
		on: "{ opacity: 1; transform: scale(1); filter: blur(0); }",
		off: "{ opacity: 0; transform: scale(0.9); filter: blur(4px); }",
	})
	const variants: React.ComponentProps<typeof Badge>["variant"][] = [
		"outline",
		"brand",
		"default",
	]
	return (
		<div className={cn("grid grid-cols-1", props.className)}>
			<style>{style}</style>

			{props.steps.map((step, i) => (
				<Badge
					key={step}
					variant={variants[i]}
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
