import { type ReactNode, useId } from "react"
import ReactMarkdown from "react-markdown"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { generateCycleCSS } from "@/lib/generate-cycle-css"
import { cn } from "@/lib/utils"

type Message = { role: "user" | "assistant"; content: string }

const DURATION = 12000
const TRANSITION_PERCENT = 10
const EXIT_TRANSITION_PERCENT = 10
const ACTIVE_PERCENT = 50

export const AddConversationContext = ({
	rephrased,
	children,
}: {
	rephrased: string
	children: ReactNode
}) => {
	const parsedMessages = children!
		.toString()
		.split(/\r?\n|\\n/)
		.flatMap((line) => {
			const [role, content] = line.split(":").map((str) => str.trim())
			if (!content) return []
			return [{ role: role.toLowerCase() as Message["role"], content }]
		})

	const componentId = useId().replaceAll(":", "")
	const totalItems = parsedMessages.length + 1

	const stepProp = ACTIVE_PERCENT / totalItems
	const proportions = [0.05, ...Array(totalItems).fill(stepProp)]

	const style = generateCycleCSS({
		componentId,
		duration: DURATION,
		proportions,
		accumulate: true,
		cycleEndPercent: 100,
		transitionPercent: TRANSITION_PERCENT,
		exitTransitionPercent: EXIT_TRANSITION_PERCENT,
		on: "opacity: 1; transform: translateY(0); filter: blur(0px);",
		off: "opacity: 0; transform: translateY(8px); filter: blur(4px);",
	})

	return (
		<div className="rounded-xl border bg-card p-6 text-sm">
			<style>{style}</style>

			<div className="space-y-3">
				{parsedMessages.map((msg, i) => (
					<div
						key={msg.content}
						className={cn(
							`a-${componentId}-${i + 1}`,
							"max-w-[85%] rounded-lg border px-3 py-2",
							msg.role === "user" ? "ml-auto bg-background" : "bg-secondary",
						)}
					>
						{msg.content}
					</div>
				))}
			</div>

			<div className={`a-${componentId}-${parsedMessages.length + 1}`}>
				<Separator className="my-4" />

				<Badge variant="brand" className="mb-2">
					Context Added
				</Badge>

				<div className="leading-relaxed">
					<ReactMarkdown
						components={{
							p: "div",
							strong: ({ children }) => (
								<strong className="font-bold">{children}</strong>
							),
						}}
					>
						{rephrased}
					</ReactMarkdown>
				</div>
			</div>
		</div>
	)
}
