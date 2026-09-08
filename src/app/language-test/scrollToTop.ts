// Jump the window to the very top instantly. The site sets
// `html { scroll-behavior: smooth }`, so smooth scrolling is switched off for
// the jump and restored right after. Used between test steps so a new card is
// never shown with its top cut off after the visitor scrolled down to a button.
export function scrollToTop() {
  if (typeof window === "undefined") return;
  const root = document.documentElement;
  const prev = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo({ top: 0 });
  root.style.scrollBehavior = prev;
}
