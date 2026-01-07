import type { MetadataRoute } from "next"
import { homeContent } from "@/content/home"

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://joshuakirby.dev"

	const projectUrls = homeContent.projects.map((project) => ({
		url: `${baseUrl}${project.href}`,
		lastModified: new Date(),
		changeFrequency: "monthly" as const,
		priority: 0.8,
	}))

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
		...projectUrls,
	]
}
