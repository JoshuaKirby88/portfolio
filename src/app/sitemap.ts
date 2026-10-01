import type { MetadataRoute } from "next"
import { caseStudies } from "@/content/work"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://joshuakirby.dev"

	const projectUrls = caseStudies.map((project) => ({
		url: `${baseUrl}/projects/${project.slug}`,
		lastModified: new Date(project.lastModified),
		changeFrequency: "monthly" as const,
		priority: 0.8,
	}))

	return [
		{
			url: baseUrl,
			lastModified: new Date("2026-10-01"),
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: `${baseUrl}/projects`,
			lastModified: new Date("2026-10-01"),
			changeFrequency: "monthly",
			priority: 0.9,
		},
		...projectUrls,
	]
}
