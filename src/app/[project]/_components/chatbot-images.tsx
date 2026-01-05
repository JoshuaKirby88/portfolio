import Image from "next/image"

export const ChatbotImages = (props: {
	images: { src: string; alt: string }[]
}) => {
	return (
		<div className="not-prose flex flex-wrap justify-center gap-4">
			{props.images.map((image) => (
				<div
					key={image.src}
					className="relative overflow-hidden rounded-xl border bg-background pr-10 pb-10"
				>
					<div className="relative rounded-br-4xl border-ring border-r-5 border-b-5 bg-muted pt-20 pr-3 pb-3 pl-20 shadow-xl">
						<Image src={image.src} alt={image.alt} width={275} height={400} />
					</div>
				</div>
			))}
		</div>
	)
}
