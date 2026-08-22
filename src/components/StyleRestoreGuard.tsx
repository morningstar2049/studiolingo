"use client";

import { useEffect } from "react";

/**
 * iOS Safari sometimes restores a backgrounded/purged tab with the page's
 * stylesheet not applied — fonts fall back to serif, layout collapses — and
 * keeps it that way until the user manually refreshes. This detects that
 * unstyled state and hard-reloads once to recover.
 *
 * Detection probes an actual Tailwind utility (`hidden` → `display:none`). If
 * the app stylesheet is applied the probe is `none`; if it's missing the probe
 * is the default `block`. This tests the exact stylesheet that goes missing —
 * unlike the next/font `--font-firago` variable, which is injected separately
 * and can still resolve on an otherwise-unstyled page.
 *
 * A sessionStorage latch caps it at one automatic reload, so there is never a
 * loop; the latch clears as soon as a styled page is seen.
 */
export default function StyleRestoreGuard() {
  useEffect(() => {
    const KEY = "sl-style-reload";

    const isStyled = () => {
      const probe = document.createElement("div");
      probe.className = "hidden";
      probe.setAttribute("aria-hidden", "true");
      document.body.appendChild(probe);
      const applied = getComputedStyle(probe).display === "none";
      probe.remove();
      return applied;
    };

    const recover = () => {
      if (isStyled()) {
        sessionStorage.removeItem(KEY);
        return;
      }
      if (!sessionStorage.getItem(KEY)) {
        sessionStorage.setItem(KEY, "1");
        window.location.reload();
      }
    };

    // Defer briefly so a normal load's stylesheet has applied before we judge.
    const check = () => window.setTimeout(recover, 300);

    check(); // covers a broken first paint
    const onPageShow = () => check();
    const onVisible = () => {
      if (document.visibilityState === "visible") check();
    };

    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return null;
}
