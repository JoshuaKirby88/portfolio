export const projects = [
	{
		title: "RAG Customer Support Chatbot",
		slug: "genkijacs",
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
	},
	{
		title: "AI Conversational Placement Test",
		slug: "placement-test",
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
	},
	{
		title: "Attacking Whisper",
		slug: "attacking-whisper",
		image: "/projects/attacking-whisper.webp",
		imageWidth: 1200,
		imageHeight: 630,
		description:
			"Making Whisper transcribe a chosen sentence, then testing whether the attack survives real calls.",
		lastModified: "2026-10-01",
		bullets: [
			"Designed a **72-speaker study** showing that attack success fell from **51.6% in simulated call tests to 21.9% in real calls**.",
			"Improved agreement between local tests and real calls, reducing the average difference in attack success rates **by about a third**.",
			"**First author** of a paper submitted to **ICASSP 2027**.",
		],
	},
] as const
