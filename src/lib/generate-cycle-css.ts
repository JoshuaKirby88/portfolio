export const generateCycleCSS = (options: {
	componentId: string
	duration: number
	proportions: number[]
	accumulate?: boolean
	cycleEndPercent?: number
	transitionPercent: number
	exitTransitionPercent?: number
	on: string
	off: string
}) => {
	const exitTransitionPercent =
		options.exitTransitionPercent ?? options.transitionPercent
	const cycleEnd = options.cycleEndPercent ?? 100
	const syncWindow = Math.max(
		options.transitionPercent,
		exitTransitionPercent,
	)

	let currentPercent = 0
	const steps = options.proportions.map((p) => {
		const normalizedP = p <= 1 ? p * 100 : p
		const start = currentPercent
		const end = options.accumulate ? cycleEnd : currentPercent + normalizedP
		currentPercent += normalizedP
		return { start, end }
	})

	return steps
		.map((step, i) => {
			const rawPoints: { percent: number; style: string }[] = []
			const add = (p: number, s: string) =>
				rawPoints.push({ percent: p, style: s })

			const fadeInStart = step.start
			let fadeInEnd = step.start + options.transitionPercent

			let fadeOutStart: number
			let fadeOutEnd: number

			if (options.accumulate) {
				fadeOutEnd = step.end
				fadeOutStart =
					step.end >= 100
						? step.end - syncWindow
						: step.end - exitTransitionPercent
			} else {
				fadeOutStart = step.end
				fadeOutEnd = step.end + exitTransitionPercent

				if (fadeOutEnd > 100) {
						fadeOutStart = 100 - syncWindow
						fadeOutEnd = 100
					}
			}

			if (fadeInEnd > fadeOutStart) {
				fadeInEnd = fadeOutStart
			}

			if (step.start === 0) {
				if (options.accumulate) {
						add(0, options.off)
					} else {
						add(0, options.on)
					}
			} else {
				add(0, options.off)
			}

			if (step.start === 0) {
				if (options.accumulate) {
						add(fadeInEnd, options.on)
					}
			} else {
				add(fadeInStart, options.off)
				add(fadeInEnd, options.on)
			}

			if (fadeOutStart < 100) {
				add(fadeOutStart, options.on)
			}

			add(fadeOutEnd, options.off)

			if (fadeOutEnd < 100) {
				if (!(step.start === 0 && !options.accumulate)) {
						add(100, options.off)
					}
			}

			if (step.start === 0 && !options.accumulate) {
				add(100 - syncWindow, options.off)
				add(100, options.on)
			}

			rawPoints.sort((a, b) => a.percent - b.percent)

			const uniquePoints = rawPoints.filter(
				(p, index, self) =>
						index === 0 || Math.abs(p.percent - self[index - 1].percent) > 0.0001,
			)

			const cssKeyframes = uniquePoints
				.map((p) => `${parseFloat(p.percent.toFixed(4))}% { ${p.style} }`)
				.join(" ")

			const isFirst = step.start < 0.001
			const initialStyle = isFirst && !options.accumulate ? options.on : options.off

			return `.a-${options.componentId}-${i} { ${initialStyle} animation: k-${options.componentId}-${i} ${options.duration}ms cubic-bezier(0.2, 0.8, 0.2, 1) infinite both; will-change: transform, opacity; }
@keyframes k-${options.componentId}-${i} {
	${cssKeyframes}
}`
		})
		.join("\n")
}