"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type FadeInViewProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function FadeInView({
  children,
  className,
  delay = 0,
  y = 22,
}: FadeInViewProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
