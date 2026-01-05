import { cn } from "@/lib/utils"

export const MacMail = ({
	children,
	className,
	sender = "John Doe",
	subject = "Subject",
}: {
	children: React.ReactNode
	className?: string
	sender?: string
	subject?: string
}) => {
	return (
		<div
			className={cn(
				"overflow-hidden rounded-xl border bg-background shadow-sm",
				className,
			)}
		>
			<div className="flex items-center gap-2 border-b bg-muted/50 px-3 py-2">
				<div className="flex gap-1.5">
					<div className="size-2 rounded-full bg-foreground/20" />
					<div className="size-2 rounded-full bg-foreground/20" />
					<div className="size-2 rounded-full bg-foreground/20" />
				</div>
			</div>
			<div className="flex">
				{/* List mock */}
				<div className="hidden w-16 shrink-0 space-y-2 border-r bg-muted/10 p-2 sm:block">
					<div className="h-1 w-full rounded-full bg-foreground/10" />
					<div className="h-1 w-3/4 rounded-full bg-foreground/10" />
					<div className="h-1 w-5/6 rounded-full bg-foreground/10" />
				</div>
				<div className="flex min-w-0 flex-1 flex-col">
					<div className="space-y-0.5 border-b p-2">
						<div className="truncate font-bold text-[10px] text-foreground/80 leading-none">
							{sender}
						</div>
						<div className="truncate text-[9px] text-muted-foreground leading-none">
							{subject}
						</div>
					</div>
					<div className="p-2 text-[10px] text-foreground/90 leading-tight">
						{children}
					</div>
				</div>
			</div>
		</div>
	)
}
