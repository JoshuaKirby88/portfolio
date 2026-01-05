import { cn } from "@/lib/utils"

export const MacTerminal = ({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) => {
	return (
		<div
			className={cn("overflow-hidden rounded-xl border bg-muted", className)}
		>
			<div className="flex items-center gap-2 p-3">
				<div className="size-3 rounded-full bg-foreground/20" />
				<div className="size-3 rounded-full bg-foreground/20" />
				<div className="size-3 rounded-full bg-foreground/20" />
			</div>
			<div className="whitespace-pre-wrap p-4 font-mono text-sm">
				{children}
			</div>
		</div>
	)
}
