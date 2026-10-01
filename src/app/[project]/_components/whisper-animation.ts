import recording from "../../../../public/attacking-whisper/checkpoints.json"

const AMPLITUDE_SCALE = 52 / Math.max(...recording.sourcePeaks)
const BASELINE = 64

function amplitudeArea(amplitudes: number[], gain = 1) {
	const edge = amplitudes.map((amplitude, i) => {
		const x = (i / (amplitudes.length - 1)) * 320
		return `L${x.toFixed(2)} ${(BASELINE - amplitude * gain * AMPLITUDE_SCALE).toFixed(3)}`
	})
	return `M0 ${BASELINE} ${edge.join(" ")} L320 ${BASELINE} Z`
}

export const SOURCE_PATH = amplitudeArea(recording.sourcePeaks)
export const PERTURBATION_DISPLAY_GAIN = recording.displayGain
export const PHASE_TRANSITION_MS = 800
export const CHECKPOINTS = recording.checkpoints.map((frame) => ({
	...frame,
	path: amplitudeArea(frame.perturbationPeaks, PERTURBATION_DISPLAY_GAIN),
}))
export const DURATION = CHECKPOINTS.reduce(
	(sum, frame) => sum + frame.durationMs,
	0,
)

export function checkpointAt(time: number) {
	const position = time % DURATION
	let end = 0
	return CHECKPOINTS.findIndex((frame) => {
		end += frame.durationMs
		return position < end
	})
}

export function waveformCSS(componentId: string) {
	const points = [{ time: 0, path: CHECKPOINTS[0].path }]
	let time = CHECKPOINTS[0].durationMs
	points.push({ time, path: CHECKPOINTS[0].path })
	for (let i = 1; i < CHECKPOINTS.length; i++) {
		const frame = CHECKPOINTS[i]
		points.push({
			time: time + Math.min(450, frame.durationMs * 0.6),
			path: frame.path,
		})
		time += frame.durationMs
	}
	points.push({ time: DURATION, path: CHECKPOINTS.at(-1)!.path })
	return `
.${componentId} { animation: ${componentId} ${DURATION}ms linear infinite both; }
.${componentId}-sequence { animation: ${componentId}-reset ${DURATION}ms cubic-bezier(0.4, 0, 0.2, 1) infinite both; }
@keyframes ${componentId} {
	${points.map(({ time, path }) => `${((time / DURATION) * 100).toFixed(5)}% { d: path("${path}"); }`).join("\n")}
}
@keyframes ${componentId}-reset {
	0%, 100% { opacity: 0; }
	${(PHASE_TRANSITION_MS / DURATION) * 100}%, ${(1 - PHASE_TRANSITION_MS / DURATION) * 100}% { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
	.${componentId} { animation: none; d: path("${CHECKPOINTS.at(-1)!.path}"); }
	.${componentId}-sequence { animation: none; opacity: 1; }
}`
}
export const PHASE_PROPORTIONS = [
	CHECKPOINTS[0].durationMs / DURATION,
	1 -
		(CHECKPOINTS[0].durationMs +
			CHECKPOINTS[CHECKPOINTS.length - 1].durationMs) /
			DURATION,
	CHECKPOINTS[CHECKPOINTS.length - 1].durationMs / DURATION,
]
