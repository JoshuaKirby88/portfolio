import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

export const ThemeImage = ({
	src,
	alt,
	className,
	children,
	...props
}: ImageProps) => {
	return (
		<div className="not-prose overflow-hidden rounded-xl border bg-background">
			<Image
				src={`${src}light.webp`}
				alt={alt}
				className={cn(className, "dark:hidden")}
				{...props}
			/>
			<Image
				src={`${src}dark.webp`}
				alt={alt}
				className={cn(className, "hidden dark:inline-block")}
				{...props}
			/>
		</div>
	)
}
