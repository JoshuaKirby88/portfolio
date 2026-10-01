// Adapted from Hirael's Timeline: https://hirael.com/components/data/timeline
// MIT · Mohammad Shehadeh

import type * as React from "react"
import { cn } from "@/lib/utils"

function Timeline({ className, ...props }: React.ComponentProps<"ol">) {
	return <ol className={cn("relative flex flex-col", className)} {...props} />
}

function TimelineItem({ className, ...props }: React.ComponentProps<"li">) {
	return (
		<li
			className={cn(
				"relative flex gap-4 pb-8 last:pb-0 before:absolute before:start-[7px] before:inset-y-0 before:w-px before:bg-border first:before:top-3.5 last:before:bottom-auto last:before:h-3.5",
				className,
			)}
			{...props}
		/>
	)
}

function TimelineDot({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			aria-hidden="true"
			className={cn(
				"relative z-10 mt-1 inline-flex size-[15px] shrink-0 rounded-full bg-foreground ring-2 ring-background",
				className,
			)}
			{...props}
		/>
	)
}

function TimelineContent({ className, ...props }: React.ComponentProps<"div">) {
	return <div className={cn("min-w-0 flex-1 pt-0.5", className)} {...props} />
}

export { Timeline, TimelineItem, TimelineDot, TimelineContent }
