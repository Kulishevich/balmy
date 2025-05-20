"use client";
import { ReactNode } from "react";
import { m } from "motion/react";

interface Props {
  children: ReactNode;
}

function SectionAnimationWrapper({ children }: Props) {
  return (
    <m.div
      initial={{ opacity: 0, y: 31 }}
      whileInView={{ opacity: 100, y: 0 }}
      transition={{ duration: 0.42, ease: "easeInOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </m.div>
  );
}

export default SectionAnimationWrapper;
