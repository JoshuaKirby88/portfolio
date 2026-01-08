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
			{ name: "Email", icon: MailIcon, href: "mailto:jojokirby88@gmail.com" },
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
	description: `I’m a 2nd‑year AI & CS student with experience shipping production-grade LLM applications for real-world businesses.
I like taking ambiguous ideas and turning them into reliable AI products.`,
	workExperience: {
		title: "Work Experience",
		experiences: [
			{
				name: "GenkiJACS",
				description: "Software Engineer Intern",
				duration: "Sep 2023 – Jun 2024",
			},
			{
				name: "The HALO Trust",
				description: "Student Intern - Technology",
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
					"2nd year (expected graduation 2027)",
				],
			},
		],
	},
	projects: [
		{
			title: "GenkiJACS Internship",
			href: "/genkijacs",
			image: "/projects/genkijacs.webp",
			bullets: [
				"RAG chatbot handling **10,000+ messages** from **2,000+ users**, saving **~70 staff‑hours/week**.",
				"**Zero‑maintenance** scraping pipeline that provides analytics to guide site improvements.",
				"Conducted **ablation studies** with **700+ relevance judgments** to optimise the RAG pipeline.",
			],
			button: "Read Case Study",
		},
		{
			title: "AI Conversational Placement Test",
			href: "/placement-test",
			image: "/projects/placement-test.webp",
			bullets: [
				"Cut the placement process from **2 weeks** to **30 minutes** by replacing manual Zoom interviews.",
				"Automated a senior teacher's grading process with a state machine validated by a **600-sample** eval suite.",
				"Designed a **multi-tenant** platform with **configurable auth** that grants ownership while supporting diverse privacy requirements.",
			],
			button: "Read Case Study",
		},
	],
}
