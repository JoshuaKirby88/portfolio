import type { ReactNode } from "react"
import { getTextFromChildren } from "@/lib/get-text-from-children"
import { cn } from "@/lib/utils"

export function MacMail(props: {
	to: string
	from: string
	subject: string
	children: ReactNode
	className?: string
}) {
	const children = getTextFromChildren(props.children)
	return (
		<div
			className={cn("my-10 w-full rounded-xl border bg-muted", props.className)}
		>
			<div className="flex w-fit items-center gap-2 p-3">
				<div className="size-3 rounded-full bg-red-500/80" />
				<div className="size-3 rounded-full bg-amber-500/80" />
				<div className="size-3 rounded-full bg-emerald-500/80" />
			</div>

			<div className="flex flex-col text-sm">
				<div className="flex items-center border-b px-4 py-2">
					<span className="mr-2 text-muted-foreground">To:</span>
					<span>{props.to}</span>
				</div>
				<div className="flex items-center border-b px-4 py-2">
					<span className="mr-2 text-muted-foreground">Subject:</span>
					<span className="font-medium">{props.subject}</span>
				</div>
				<div className="flex items-center border-b px-4 py-2">
					<span className="mr-2 text-muted-foreground">From:</span>
					<span>{props.from}</span>
				</div>
			</div>

			<div className="whitespace-pre-wrap p-6 text-sm leading-relaxed">
				{children.trim()}
			</div>
		</div>
	)
}
