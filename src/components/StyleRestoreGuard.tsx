"use client";

import { useEffect } from "react";

/**
 * iOS Safari sometimes restores a backgrounded/purged tab with the page's
 * stylesheets not re-applied — fonts fall back to serif, layout breaks — and
 * keeps it that way until the user manually refreshes. This detects that
 * unstyled restore and hard-reloads once to get a clean render.
 *
 * The check is conservative: it only reloads when the app CSS is verifiably
 * absent (the next/font `--font-firago` variable, set on <html>, is empty), so
 * healthy loads (and every other browser) are never reloaded. A sessionStorage
 * latch guarantees at most one automatic reload, preventing any loop.
 */
export default function StyleRestoreGuard() {
  useEffect(() => {
    const KEY = "sl-style-reload";

    const check = () => {
      const styled = !!getComputedStyle(document.documentElement)
        .getPropertyValue("--font-firago")
        .trim();

      if (styled) {
        sessionStorage.removeItem(KEY);
        return;
      }
      if (!sessionStorage.getItem(KEY)) {
        sessionStorage.setItem(KEY, "1");
        window.location.reload();
      }
    };

    // Runs on the initial load and, crucially, on every bfcache/tab restore.
    const onShow = () => requestAnimationFrame(check);
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  return null;
}
