"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Transição de página (Framer Motion) — fade SÓ de opacidade (sem transform)
 * para não criar containing block que interfira no GSAP/ScrollTrigger/Lenis.
 * Respeita prefers-reduced-motion.
 *
 * 1ª carga SEM fade (19/07, FILM): initial opacity:0 ia pro SSR e a página
 * inteira só pintava quando o Framer hidratava (~3.5s em Slow-4G — segurava o
 * LCP e deixava o visitante numa tela vazia). O fade fica só para navegações
 * client-side, onde o JS já está quente.
 */
let hasPainted = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const first = useRef(!hasPainted);
  useEffect(() => {
    hasPainted = true;
  }, []);
  return (
    <motion.div
      initial={first.current || reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
