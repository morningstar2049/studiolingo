import type { ReactNode } from "react";
import RevealOnScroll from "../RevealOnScroll";

// Dark-navy, capitalized-FiraGO subhead used inside course descriptions.
// Re-reveals with a rise animation each time it scrolls into view.
export default function CourseSubhead({ children }: { children: ReactNode }) {
  return (
    <RevealOnScroll revealClass="blog-rise" className="mt-6 mb-2">
      <h3
        style={{ fontFeatureSettings: "'case' on" }}
        className="text-lg font-bold sm:text-xl text-lingo-black"
      >
        {children}
      </h3>
    </RevealOnScroll>
  );
}
