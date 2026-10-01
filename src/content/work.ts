export const work = [
	{
		title: "Attacking Whisper",
		slug: "attacking-whisper",
		dates: "Jul – Sep 2026",
		previewImage: "/projects/previews/attacking-whisper.webp",
		image: "/projects/attacking-whisper.webp",
		imageWidth: 1200,
		imageHeight: 630,
		description:
			"Designed a study testing whether audio attacks on Whisper survive real calls and submitted a first-author paper to ICASSP 2027.",
		lastModified: "2026-10-01",
		bullets: [
			"Designed a **72-speaker study** showing attack success fell from **51.6% in simulation to 21.9% in real calls**.",
			"Improved agreement between local tests and real calls, reducing the difference in attack success rates **by about a third**.",
			"**First author** of a paper submitted to **ICASSP 2027**.",
		],
	},
	{
		title: "AI Conversational Placement Test",
		slug: "placement-test",
		dates: "2024 – present",
		previewImage: "/projects/previews/placement-test.webp",
		image: "/projects/placement-test.webp",
		imageWidth: 1200,
		imageHeight: 620,
		description:
			"Built a spoken-Japanese placement test that reduces a two-week process to 30 minutes, and evaluated its grammar detection against about 600 manual annotations.",
		lastModified: "2026-10-01",
		bullets: [
			"Cut spoken-Japanese placement from **2 weeks to 30 minutes**.",
			"Evaluated grammar detection against **about 600 manual annotations**.",
		],
	},
	{
		title: "RAG Customer Support Chatbot",
		slug: "genkijacs",
		dates: "Sep 2023 – Jun 2024",
		previewImage: "/projects/previews/genkijacs.webp",
		image: "/projects/genkijacs.webp",
		imageWidth: 1200,
		imageHeight: 630,
		description:
			"A production chatbot for two schools, with retrieval choices tested against 700+ relevance judgments.",
		lastModified: "2026-09-26",
		bullets: [
			"Built production chatbots for **two schools**, used by **2,000+ users**.",
			"Compared retrieval choices using **700+ relevance judgments**.",
		],
	},
	{
		title: "The HALO Trust",
		dates: "Dec 2021 – Apr 2023",
		description: "Technology Intern",
	},
] as const

export const caseStudies = work.filter((entry) => "slug" in entry)
