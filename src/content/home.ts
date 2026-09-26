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
	projects: [
		{
			title: "RAG Customer Support Chatbot",
			href: "/genkijacs",
			image: "/projects/genkijacs.webp",
			imageWidth: 1200,
			imageHeight: 630,
			description:
				"A production RAG chatbot handling 14,000+ messages for 2,000+ users while saving about 70 staff-hours per week.",
			lastModified: "2026-09-26",
			bullets: [
				"Designed and deployed a RAG chatbot handling **14,000+ messages** from **2,000+ users**, saving **~70 staff‑hours/week**.",
				"Engineered a **zero‑maintenance** scraping pipeline that provides analytics to guide site improvements.",
				"Conducted **ablation studies** with **700+ relevance judgments** to optimise the RAG pipeline.",
			],
			button: "Read Case Study",
		},
		{
			title: "AI Conversational Placement Test",
			href: "/placement-test",
			image: "/projects/placement-test.webp",
			imageWidth: 1200,
			imageHeight: 620,
			description:
				"An AI assessment that reduces a two-week placement process to a 30-minute, on-demand test.",
			lastModified: "2026-09-26",
			bullets: [
				"Cut the placement process from **2 weeks** to **30 minutes** by replacing manual Zoom interviews.",
				"Automated a senior teacher's grading process with a state machine validated by a **600-sample** eval suite.",
				"Designed a **multi-tenant** platform with **configurable auth** that grants ownership while supporting diverse privacy requirements.",
			],
			button: "Read Case Study",
		},
	],
}
