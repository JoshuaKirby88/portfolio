export const getOnOffCycleCSS = (input: {
	componentId: string
	duration: number
	proportions: number[]
	on: string
	off: string
}) => {
	return input.proportions
		.map((proportion, i) => {
			const delayPercent = input.proportions
				.slice(0, i)
				.reduce((acc, curr) => acc + curr * 100, 0)
			const isLast = i === input.proportions.length - 1
			const startOnPercent = delayPercent === 0 ? 0 : delayPercent + 5
			const endOnPercent = delayPercent + proportion * 100 - (isLast ? 5 : 0)
			const startLastPercent = i === 0 || isLast ? 100 : endOnPercent + 5
			return `
.a-${input.componentId}-${i} {
	animation: k-${input.componentId}-${i} ${input.duration}ms linear infinite;
}
@keyframes k-${input.componentId}-${i} {
	0%, ${delayPercent}% ${input.off}
	${startOnPercent}%, ${endOnPercent}% ${input.on}
	${i === 0 ? `${endOnPercent + 5}%, 95% ${input.off}` : ""}
	${startLastPercent}%, 100% ${i === 0 ? input.on : input.off}
}`
		})
		.join("\n")
}
