import { ArrowDown, ArrowUp, HashIcon, Link as LinkIcon } from "lucide-react"
import { StatusBadge } from "@/components/status-badge"
import { StatusDots } from "@/components/status-dots"
import { cn } from "@/lib/utils"

const DURATION = 8000
const PROPORTIONS = [0.2, 0.25, 0.55]

export function WebsiteContentProcess() {
	const styles = `
.a-neighbor-up {
	animation: k-neighbor-up ${DURATION}ms cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
}
.a-neighbor-down {
	animation: k-neighbor-down ${DURATION}ms cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
}
.a-connector {
	animation: k-connector ${DURATION}ms linear infinite;
}
.a-meta {
	animation: k-meta ${DURATION}ms linear infinite;
}
.a-text {
	animation: k-text ${DURATION}ms linear infinite;
}

@keyframes k-neighbor-up {
	0%, 20% { opacity: 0; transform: translateY(12px) scale(0.98); filter: blur(2px); }
	40%, 95% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
	100% { opacity: 0; transform: translateY(12px) scale(0.98); filter: blur(2px); }
}
@keyframes k-neighbor-down {
	0%, 20% { opacity: 0; transform: translateY(-12px) scale(0.98); filter: blur(2px); }
	40%, 95% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
	100% { opacity: 0; transform: translateY(-12px) scale(0.98); filter: blur(2px); }
}

@keyframes k-connector {
	0%, 17.5% { opacity: 0; scale(0.98); filter: blur(2px); }
	27.5%, 90% { opacity: 1; scale(1); filter: blur(0); }
	100% { opacity: 0; scale(0.98); filter: blur(2px); }
}

@keyframes k-meta {
	0%, 45% { opacity: 1; scale(1); filter: blur(0); }
	50%, 95% { opacity: 0; scale(0.98); filter: blur(2px); }
	100% { opacity: 1; scale(1); filter: blur(0); }
}
@keyframes k-text {
	0%, 45% { opacity: 0; scale(0.98); filter: blur(2px); }
	50%, 95% { opacity: 1; scale(1); filter: blur(0); }
	100% { opacity: 0; scale(0.98); filter: blur(2px); }
}`

	return (
		<div className="relative flex w-full flex-col items-center justify-center space-y-2 rounded-xl border bg-card p-8 text-sm">
			<style>{styles}</style>

			<StatusBadge
				className="absolute top-4 left-4"
				duration={DURATION}
				proportions={PROPORTIONS}
				steps={["Found Match", "Expand Neighbours", "Fetch Text"]}
			/>

			<StatusDots
				duration={DURATION}
				proportions={PROPORTIONS}
				className="absolute top-4 right-4"
			/>

			<ChunkCard
				index={2}
				content="At Genki, we believe you can't learn a language using only a textbook. You need to feel it, use it, ..."
				slideAnimation="a-neighbor-up"
			/>

			<div className="a-connector flex h-4 flex-col items-center text-muted-foreground/50">
				<ArrowUp className="size-4" />
			</div>

			<ChunkCard
				index={3}
				content="... live it. That's why we focus not just on teaching you the basics of grammar, ..."
			/>

			<div className="a-connector flex h-4 flex-col items-center text-muted-foreground/50">
				<ArrowDown className="size-4" />
			</div>

			<ChunkCard
				index={4}
				content="... but also on how to live in Japan and communicate with real Japanese people."
				slideAnimation="a-neighbor-down"
			/>
		</div>
	)
}

function ChunkCard({
	index,
	content,
	slideAnimation,
}: {
	index: number
	content: string
	slideAnimation?: string
}) {
	return (
		<div
			className={cn(
				"grid h-fit w-full max-w-[320px] grid-cols-1 rounded-xl border bg-background p-3 font-medium text-xs",
				slideAnimation,
			)}
		>
			<div className="a-meta col-start-1 row-start-1 flex flex-col justify-center gap-1.5">
				<div className="flex items-center gap-2">
					<LinkIcon className="size-3" />
					<div>genkijacs.com</div>
				</div>
				<div className="flex items-center gap-2">
					<HashIcon className="size-3" />
					<div>{index}</div>
				</div>
			</div>

			<div className="a-text col-start-1 row-start-1 leading-relaxed">
				{content}
			</div>
		</div>
	)
}
