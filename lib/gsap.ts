"use client";

// Registro centralizado dos plugins GSAP (100% gratuitos desde abr/2025).
// SplitText incluído no core a partir do gsap 3.13.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText, useGSAP };
