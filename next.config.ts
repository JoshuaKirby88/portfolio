import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare"
import type { NextConfig } from "next"

initOpenNextCloudflareForDev()

const nextConfig: NextConfig = {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.md$/,
			use: "raw-loader",
		})
		return config
	},
	eslint: { ignoreDuringBuilds: true },
	async redirects() {
		return [
			"/cv",
			"/resume",
			"/curriculum-vitae",
			"/pdf",
			"/cv.pdf",
			"/resume.pdf",
		].map((source) => ({
			source,
			destination: "/Joshua_Kirby_CV.pdf",
			permanent: true,
		}))
	},
}

export default nextConfig
