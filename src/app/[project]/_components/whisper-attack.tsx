"use client"

import { Pause, Play, VolumeX } from "lucide-react"
import { useCallback, useEffect, useId, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { StatusDots } from "./status-dots"
import { WhisperTranscript } from "./whisper-transcript"
import {
	CHECKPOINTS,
	DURATION,
	PERTURBATION_DISPLAY_GAIN,
	PHASE_PROPORTIONS,
	PHASE_TRANSITION_MS,
	SOURCE_PATH,
	checkpointAt,
	waveformCSS,
} from "./whisper-animation"

export function WhisperAttack({
	source,
	target,
}: {
	source: string
	target: string
}) {
	const activeAudio = useRef<HTMLAudioElement | null>(null)
	const id = useId().replaceAll(":", "")
	const wave = useRef<SVGPathElement>(null)
	const [checkpoint, setCheckpoint] = useState(0)
	useEffect(() => {
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
		let request = 0
		let previous = -1
		function tick() {
			const time = Number(wave.current?.getAnimations()[0]?.currentTime ?? 0)
			const next = reducedMotion.matches
				? CHECKPOINTS.length - 1
				: checkpointAt(time)
			if (next !== previous) {
				previous = next
				setCheckpoint(next)
			}
			if (!reducedMotion.matches) request = requestAnimationFrame(tick)
		}
		function restart() {
			cancelAnimationFrame(request)
			tick()
		}
		restart()
		reducedMotion.addEventListener("change", restart)
		return () => {
			cancelAnimationFrame(request)
			reducedMotion.removeEventListener("change", restart)
		}
	}, [])
	function startPlayback(recording: HTMLAudioElement) {
		if (activeAudio.current !== recording) activeAudio.current?.pause()
		activeAudio.current = recording
	}
	return (
		<div id="whisper-demo" className="not-prose my-10">
			<style>{waveformCSS(`whisper-wave-${id}`)}</style>
			<figure
				className="relative mx-auto w-full max-w-[500px] scroll-mt-6 rounded-xl border bg-card p-4 pt-10 text-sm [--attack-accent:#b74815] dark:[--attack-accent:#fb9b65]"
				aria-label="Whisper attack"
			>
				<StatusDots
					duration={DURATION}
					proportions={PHASE_PROPORTIONS}
					transitionPercent={(PHASE_TRANSITION_MS / DURATION) * 100}
					className="absolute top-4 right-4 motion-reduce:[&>div]:bg-muted-foreground/20! motion-reduce:[&>div:last-child]:bg-primary!"
				/>
				<div
					className={`px-2 pt-1 pb-3 whisper-wave-${id}-sequence`}
					aria-hidden="true"
				>
					<svg
						className="block h-20 w-full"
						viewBox="0 0 320 72"
						preserveAspectRatio="none"
					>
						<path
							data-amplitude="source"
							className="fill-muted-foreground/50"
							d={SOURCE_PATH}
						/>
						<path
							ref={wave}
							data-amplitude="perturbation"
							className={`fill-(--attack-accent) whisper-wave-${id}`}
							d={CHECKPOINTS[0].path}
						/>
					</svg>
					<p className="text-center text-muted-foreground text-xs">
						<span className="text-[color-mix(in_srgb,var(--attack-accent)_55%,var(--muted-foreground))]">
							Perturbation
						</span>{" "}
						shown at {PERTURBATION_DISPLAY_GAIN}× scale
					</p>
					<div className="mt-3 grid min-h-16 items-center text-center text-base/6">
						<WhisperTranscript
							key={checkpoint === 0 ? "source" : "attack"}
							frame={CHECKPOINTS[checkpoint]}
							target={target}
						/>
					</div>
				</div>
				<p className="sr-only">
					Whisper&apos;s original transcript: {source}. Modified transcript:{" "}
					{target}.
				</p>
				<div
					className="flex flex-wrap justify-center gap-2"
					aria-label="Listen to either recording"
				>
					<Recording type="original" onStart={startPlayback} />
					<Recording type="modified" onStart={startPlayback} />
				</div>
			</figure>
		</div>
	)
}

function Recording({
	type,
	onStart,
}: {
	type: "original" | "modified"
	onStart: (recording: HTMLAudioElement) => void
}) {
	const audio = useRef<HTMLAudioElement>(null)
	const [playing, setPlaying] = useState(false)
	const [failed, setFailed] = useState(false)
	const connectAudio = useCallback((element: HTMLAudioElement | null) => {
		audio.current = element
		if (element) setFailed(element.error !== null)
	}, [])
	async function togglePlayback() {
		const recording = audio.current
		if (!recording) return
		if (!recording.paused) {
			recording.pause()
			return
		}
		onStart(recording)
		try {
			await recording.play()
		} catch (error) {
			if (!(error instanceof DOMException && error.name === "AbortError"))
				setFailed(true)
		}
	}
	return (
		<div data-recording={type}>
			<audio
				ref={connectAudio}
				src={
					type === "original"
						? "/attacking-whisper/source.wav"
						: "/attacking-whisper/adversarial.wav"
				}
				preload="metadata"
				onPlay={() => setPlaying(true)}
				onPause={() => setPlaying(false)}
				onEnded={() => setPlaying(false)}
				onError={() => setFailed(true)}
			/>
			<Button
				type="button"
				size="sm"
				className={cn(
					"rounded-full aria-pressed:text-background",
					type === "modified"
						? "border-(--attack-accent)/40 bg-(--attack-accent)/8 text-(--attack-accent) hover:border-(--attack-accent)/65 hover:bg-(--attack-accent)/14 hover:text-(--attack-accent) aria-pressed:border-(--attack-accent) aria-pressed:bg-(--attack-accent)"
						: "border-muted-foreground/35 bg-transparent text-muted-foreground hover:bg-muted hover:text-muted-foreground aria-pressed:border-muted-foreground aria-pressed:bg-muted-foreground",
				)}
				disabled={failed}
				onClick={togglePlayback}
				aria-label={
					failed
						? type + " audio unavailable"
						: (playing ? "Pause " : "Play ") + type + " audio"
				}
				aria-pressed={playing}
			>
				{failed ? (
					<VolumeX className="size-3.5" aria-hidden="true" />
				) : playing ? (
					<Pause className="size-3" fill="currentColor" aria-hidden="true" />
				) : (
					<Play className="size-3" fill="currentColor" aria-hidden="true" />
				)}
				{type === "original" ? "Source audio" : "Modified audio"}
			</Button>
		</div>
	)
}
