import { type ReactNode, useId } from "react"
import ReactMarkdown from "react-markdown"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type Message = { role: "user" | "assistant"; content: string }

const STEP_MS = 1500
const HOLD_MS = 3000
const FADE_OUT_MS = 600
const LOOP_DELAY_MS = 1000

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
	const appearPhaseMs = totalItems * STEP_MS
	const fadeOutStartMs = appearPhaseMs + HOLD_MS
	const fadeOutEndMs = fadeOutStartMs + FADE_OUT_MS
	const totalDurationMs = fadeOutEndMs + LOOP_DELAY_MS

	const fadeOutStartPercent = (fadeOutStartMs / totalDurationMs) * 100
	const fadeOutEndPercent = (fadeOutEndMs / totalDurationMs) * 100

	const getKeyframes = (index: number) => {
		const startMs = index * STEP_MS
		const appearMs = startMs + 500
		const startPercent = (startMs / totalDurationMs) * 100
		const appearPercent = (appearMs / totalDurationMs) * 100
		return `@keyframes ${componentId}-${index} {
	0% { opacity: 0; transform: translateY(8px); }
	${startPercent}% { opacity: 0; transform: translateY(8px); }
	${appearPercent}% { opacity: 1; transform: translateY(0); }
	${fadeOutStartPercent}% { opacity: 1; transform: translateY(0); }
	${fadeOutEndPercent}% { opacity: 0; transform: translateY(0); }
	100% { opacity: 0; transform: translateY(0); }
}`
	}

	const styles = [
		...parsedMessages.map((_, i) => getKeyframes(i)),
		getKeyframes(parsedMessages.length),
	].join("\n")

	return (
		<div className="rounded-xl border bg-card p-6 text-sm">
			<style>{styles}</style>

			<div className="space-y-3">
				{parsedMessages.map((msg, i) => (
					<div
						key={msg.content}
						className={cn(
							"max-w-[85%] rounded-lg border px-3 py-2",
							msg.role === "user" ? "ml-auto bg-background" : "bg-secondary",
						)}
						style={{
							animation: `${componentId}-${i} ${totalDurationMs}ms infinite ease-out`,
						}}
					>
						{msg.content}
					</div>
				))}
			</div>

			<div
				style={{
					animation: `${componentId}-${parsedMessages.length} ${totalDurationMs}ms infinite ease-out`,
				}}
			>
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
