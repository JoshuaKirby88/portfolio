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
}

export default nextConfig
