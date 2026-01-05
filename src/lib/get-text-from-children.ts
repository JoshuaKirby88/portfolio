import React, { type ReactNode } from "react"

export function getTextFromChildren(children: ReactNode): string {
	if (typeof children === "string") return children
	if (typeof children === "number") return children.toString()
	if (!children) return ""

	if (Array.isArray(children)) {
		return children.map(getTextFromChildren).join("")
	}

	if (React.isValidElement(children)) {
		return getTextFromChildren((children.props as any).children)
	}

	return ""
}
