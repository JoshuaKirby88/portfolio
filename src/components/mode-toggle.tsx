"use client"

import { useTheme } from "next-themes"
import * as React from "react"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = React.useState(false)

	React.useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	const cycleTheme = () => {
		if (theme === "light") {
			setTheme("dark")
		} else if (theme === "dark") {
			setTheme("system")
		} else {
			setTheme("light")
		}
	}

	const getThemeLabel = () => {
		if (theme === "system") return "System"
		if (theme === "dark") return "Dark"
		return "Light"
	}

	return (
		<Button
			variant="outline"
			size="sm"
			onClick={cycleTheme}
			aria-label="Toggle theme"
		>
			{getThemeLabel()}
		</Button>
	)
}
