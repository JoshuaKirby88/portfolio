import { DownloadIcon, LinkIcon, MailIcon } from "lucide-react"

export const homeContent = {
	tagline: `I build reliable AI products
end to end.`,
	me: {
		name: "Joshua Kirby",
		bullets: [
			"Full‑stack TypeScript / Next.js with LLM‑backed products",
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
	description: "AI & CS student, class of 2027.",
	workExperience: {
		title: "Work Experience",
		experiences: [
			{
				name: "GenkiJACS",
				description: "Software Engineer",
				duration: "Sep 2023 – Jun 2024",
			},
			{
				name: "The HALO Trust",
				description: "Technology Intern",
				duration: "Dec 2021 – Apr 2023",
			},
		],
	},
	education: {
		title: "Education",
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
	featuredProjects: ["genkijacs", "attacking-whisper"],
}
