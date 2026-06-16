"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Transição de página (Framer Motion) — fade SÓ de opacidade (sem transform)
 * para não criar containing block que interfira no GSAP/ScrollTrigger/Lenis.
 * Respeita prefers-reduced-motion.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
