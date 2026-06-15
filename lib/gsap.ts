"use client";

// Registro centralizado dos plugins GSAP (100% gratuitos desde abr/2025).
// SplitText/CustomEase incluídos no core a partir do gsap 3.13.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase);

// ease/cinematic do design-system: cubic-bezier(0.22, 1, 0.36, 1)
CustomEase.create("cinematic", "M0,0 C0.22,1 0.36,1 1,1");

export const EASE_CINEMATIC = "cinematic";
export const DUR_REVEAL = 0.9;
export const DUR_SHORT = 0.4;
export const STAGGER = 0.08;

export { gsap, ScrollTrigger, SplitText, CustomEase, useGSAP };
