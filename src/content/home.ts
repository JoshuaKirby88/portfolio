import { DownloadIcon, LinkIcon, MailIcon } from "lucide-react"

export const homeContent = {
	tagline: "I build and evaluate ML systems.",
	me: {
		name: "Joshua Kirby",
		bullets: [
			"Applied ML, from experiments to production",
			"Native in Japanese and English",
		],
		links: [
			{ name: "Email", icon: MailIcon, href: "mailto:joshua@joshuakirby.dev" },
			{
				name: "LinkedIn",
				icon: LinkIcon,
				href: "https://www.linkedin.com/in/joshua-h-kirby/",
			},
			{
				name: "CV",
				icon: DownloadIcon,
				href: "/Joshua_Kirby_CV.pdf",
				download: "Joshua_Kirby_CV.pdf",
			},
		],
	},
	education: {
		educations: [
			{
				name: "University of Birmingham",
				bullets: [
					"B.Sc. Artificial Intelligence & Computer Science",
					"Expected 2027",
					"85% second-year average (First Class)",
				],
			},
		],
	},
	featuredWork: ["attacking-whisper", "placement-test", "genkijacs"],
}
