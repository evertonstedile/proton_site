"use client";

// Registro centralizado dos plugins GSAP (100% gratuitos desde abr/2025).
// SplitText/CustomEase incluídos no core a partir do gsap 3.13.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useGSAP } from "@gsap/react";

// Draggable + InertiaPlugin: física de arrasto da Task 6 (SistemaFisica) — a
// ÚNICA seção com física do site. InertiaPlugin é gratuito (GSAP 3.11+).
gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  SplitText,
  CustomEase,
  Draggable,
  InertiaPlugin,
);

// ease/cinematic do design-system: cubic-bezier(0.22, 1, 0.36, 1)
CustomEase.create("cinematic", "M0,0 C0.22,1 0.36,1 1,1");
// ease/proton do motor de experiência (Task 2 SOTD): cubic-bezier(0.2,0.7,0.2,1)
CustomEase.create("proton", "0.2,0.7,0.2,1");

export const EASE_CINEMATIC = "cinematic";
export const EASE_PROTON = "proton";
export const DUR_REVEAL = 0.9;
export const DUR_SHORT = 0.4;
export const STAGGER = 0.08;

export { gsap, ScrollTrigger, SplitText, CustomEase, Draggable, useGSAP };
