import type { MetadataRoute } from "next"
import { homeContent } from "@/content/home"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://joshuakirby.dev"

	const projectUrls = homeContent.projects.map((project) => ({
		url: `${baseUrl}${project.href}`,
		lastModified: new Date(project.lastModified),
		changeFrequency: "monthly" as const,
		priority: 0.8,
	}))

	return [
		{
			url: baseUrl,
			lastModified: new Date("2026-09-26"),
			changeFrequency: "monthly",
			priority: 1,
		},
		...projectUrls,
	]
}
