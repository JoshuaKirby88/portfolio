import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
}

export const metadata: Metadata = {
	metadataBase: new URL("https://joshuakirby.dev"),
	title: {
		default: "Joshua Kirby",
		template: "%s | Joshua Kirby",
	},
	description:
		"I build reliable AI products end to end. Senior Product Designer & Frontend Developer with experience in LLM-backed products.",
	keywords: [
		"Joshua Kirby",
		"AI Engineer",
		"Frontend Developer",
		"Product Designer",
		"TypeScript",
		"Next.js",
		"LLM",
		"Full-stack",
	],
	authors: [{ name: "Joshua Kirby", url: "https://joshuakirby.dev" }],
	creator: "Joshua Kirby",
	openGraph: {
		type: "website",
		locale: "en_GB",
		url: "https://joshuakirby.dev",
		title: "Joshua Kirby",
		description:
			"I build reliable AI products end to end. Senior Product Designer & Frontend Developer with experience in LLM-backed products.",
		siteName: "Joshua Kirby Portfolio",
		images: [
			{
				url: "/headshot.webp",
				width: 800,
				height: 800,
				alt: "Joshua Kirby",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Joshua Kirby",
		description: "I build reliable AI products end to end.",
		images: ["/headshot.webp"],
	},
	icons: {
		icon: [
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
			{ url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
		],
		apple: "/apple-touch-icon.png",
	},
	manifest: "/site.webmanifest",
}

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning className={inter.variable}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
