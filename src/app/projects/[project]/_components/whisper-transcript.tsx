"use client"

import { useLayoutEffect, useRef } from "react"
import { TextMorph } from "torph"
import { CHECKPOINTS } from "./whisper-animation"

function normalizeWord(word: string) {
	return word.toLowerCase().replace(/[^\p{L}\p{N}']/gu, "")
}

function displayTranscript(text: string) {
	return text.replace(/[.!?…]+$/u, "")
}

export function WhisperTranscript({
	frame,
	target,
}: {
	frame: (typeof CHECKPOINTS)[number]
	target: string
}) {
	const element = useRef<HTMLParagraphElement>(null)
	const morph = useRef<TextMorph | null>(null)
	useLayoutEffect(() => {
		if (!element.current) return
		const instance = new TextMorph({
			element: element.current,
			duration: 560,
			ease: "cubic-bezier(0.22, 1, 0.36, 1)",
			scale: false,
			numbers: false,
		})
		morph.current = instance
		return () => {
			instance.destroy()
			morph.current = null
		}
	}, [])
	useLayoutEffect(() => {
		const paragraph = element.current
		const container = paragraph?.parentElement
		const measure = document.createElement("canvas").getContext("2d")
		if (!paragraph || !container || !measure) return
		const transcript = displayTranscript(frame.transcript)
		const targetWords = new Set(target.split(/\s+/).map(normalizeWord))
		const clean = frame.kind === "source" || frame.kind === "initialization"
		const words = Array.from(transcript.matchAll(/\S+/g), (match) => {
			const word = normalizeWord(match[0])
			return {
				start: match.index,
				end: match.index + match[0].length,
				kind: !clean && targetWords.has(word) ? "target" : "other",
			}
		})
		const render = () => {
			measure.font = getComputedStyle(paragraph).font
			const lines = [""]
			for (const word of transcript.split(" ")) {
				const last = lines.length - 1
				const candidate = lines[last] ? `${lines[last]} ${word}` : word
				if (
					lines[last] &&
					measure.measureText(candidate).width > container.clientWidth
				) {
					lines.push(word)
				} else {
					lines[last] = candidate
				}
			}
			morph.current?.update(lines.join("\n"))
			let offset = 0
			for (const segment of paragraph.querySelectorAll<HTMLElement>(
				"[torph-item]:not([torph-exiting])",
			)) {
				segment.dataset.wordKind =
					words.find((word) => offset >= word.start && offset < word.end)
						?.kind ?? "other"
				offset += segment.tagName === "BR" ? 1 : segment.textContent.length
			}
		}
		render()
		const resize = new ResizeObserver(render)
		resize.observe(container)
		document.fonts.addEventListener("loadingdone", render)
		return () => {
			resize.disconnect()
			document.fonts.removeEventListener("loadingdone", render)
		}
	}, [frame, target])
	return (
		<p
			ref={element}
			className="m-0 block w-full whitespace-pre motion-reduce:text-(--attack-accent) [&_[data-word-kind=target]]:text-(--attack-accent)"
			data-step={frame.step}
			data-transcript={frame.transcript}
		>
			{displayTranscript(CHECKPOINTS[0].transcript)}
		</p>
	)
}
