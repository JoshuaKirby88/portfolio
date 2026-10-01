"use client"

import dynamic from "next/dynamic"

export const WhisperAttack = dynamic(() =>
	import("./whisper-attack").then((module) => module.WhisperAttack),
)
