import { getTextFromChildren } from "@/lib/get-text-from-children"
import { cn } from "@/lib/utils"

export const MacTerminal = (props: {
	children: React.ReactNode
	className?: string
}) => {
	const children = getTextFromChildren(props.children)
	return (
		<div
			className={cn(
				"my-10 overflow-hidden rounded-xl border bg-muted",
				props.className,
			)}
		>
			<div className="flex items-center gap-2 p-3">
				<div className="size-3 rounded-full bg-red-500/80" />
				<div className="size-3 rounded-full bg-amber-500/80" />
				<div className="size-3 rounded-full bg-emerald-500/80" />
			</div>
			<div className="whitespace-pre-wrap p-4 font-mono text-sm">
				{children.trim()}
			</div>
		</div>
	)
}
