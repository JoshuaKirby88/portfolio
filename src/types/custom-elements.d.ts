import type { ReactNode } from "react"

declare module "react" {
	namespace JSX {
		interface IntrinsicElements {
			addkeywords: {
				original: string
				keywords: string
			}
			addconversationcontext: {
				rephrased: string
				children?: ReactNode
			}
			chatbotimages: {
				images: string
			}
			websitecontentprocess: {
				url: string
				match: string
				topneighbour: string
				bottomneighbour: string
			}
			macterminal: {
				children?: ReactNode
				className?: string
			}
			macmail: {
				to: string
				from: string
				subject: string
				children?: ReactNode
				className?: string
			}
			themeimage: {
				src: string
				alt: string
				width: string
				height: string
				sizes?: string
				className?: string
				caption?: string
			}
			fanoutarchitecture: {
				transcript: string
				candidates: string
			}
		}
	}
}
