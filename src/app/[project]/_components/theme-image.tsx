import Image from "next/image"
import { cn } from "@/lib/utils"

export const ThemeImage = ({
	src,
	alt,
	className,
	children,
	caption,
	...props
}: React.ComponentProps<typeof Image> & { caption?: string }) => {
	return (
		<>
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
			{caption && (
				<div className="mx-10 mt-2 text-center text-gray-500 text-sm">
					{caption}
				</div>
			)}
		</>
	)
}
