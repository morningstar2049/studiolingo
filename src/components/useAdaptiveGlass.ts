"use client";

import { useEffect, type RefObject } from "react";

// Makes a floating "liquid glass" element adapt to whatever is behind it, the
// way iOS/Safari glass does: it samples the page under the element (solid
// colours, gradients and photo pixels), composites them into one luminance
// value and sets data-tone="dark" | "light" on the element. CSS does the rest.

const imgCache = new Map<string, HTMLCanvasElement | null>();

function luminance(r: number, g: number, b: number) {
  const lin = (c: number) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

// First rgb()/rgba() colour in a CSS string → [r, g, b, a]
function parseColor(s: string): [number, number, number, number] | null {
  const m = s.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
  if (p.length < 3 || p.some((n) => Number.isNaN(n))) return null;
  return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1];
}

// Luminance of a photo at a fractional point inside its box (tiny canvas).
function sampleImage(img: HTMLImageElement, fx: number, fy: number) {
  const key = img.currentSrc || img.src;
  try {
    let c = imgCache.get(key);
    if (c === undefined) {
      if (!img.complete || !img.naturalWidth) return null;
      c = document.createElement("canvas");
      c.width = 32;
      c.height = 18;
      c.getContext("2d")!.drawImage(img, 0, 0, 32, 18);
      imgCache.set(key, c);
    }
    if (!c) return null;
    const x = Math.min(31, Math.max(0, Math.floor(fx * 32)));
    const y = Math.min(17, Math.max(0, Math.floor(fy * 18)));
    const d = c.getContext("2d")!.getImageData(x, y, 1, 1).data;
    return luminance(d[0], d[1], d[2]);
  } catch {
    imgCache.set(key, null); // tainted canvas etc.
    return null;
  }
}

// Composite luminance (0 = black, 1 = white) of everything under a point.
function toneAt(x: number, y: number, self: Element): number | null {
  const stack = document
    .elementsFromPoint(x, y)
    .filter((el) => !self.contains(el) && !el.closest("[data-glass]"));

  let acc = 0;
  let alpha = 0;
  for (const el of stack) {
    const cs = getComputedStyle(el);
    if (parseFloat(cs.opacity) === 0 || cs.visibility === "hidden") continue;

    let l: number | null = null;
    let a = 0;

    if (el instanceof HTMLImageElement) {
      const r = el.getBoundingClientRect();
      l = sampleImage(el, (x - r.left) / r.width, (y - r.top) / r.height);
      if (l == null) l = 0.25; // photos are usually dark-ish
      a = 1;
    } else if (el instanceof HTMLVideoElement || el instanceof HTMLIFrameElement) {
      l = 0.2;
      a = 1;
    } else {
      const bg = parseColor(cs.backgroundColor);
      if (bg && bg[3] > 0) {
        l = luminance(bg[0], bg[1], bg[2]);
        a = bg[3];
      }
      const bi = cs.backgroundImage;
      if (bi && bi !== "none") {
        const c = parseColor(bi);
        const li = c ? luminance(c[0], c[1], c[2]) : /url\(/.test(bi) ? 0.3 : null;
        if (li != null) {
          const ai = c ? c[3] : 1;
          if (l == null) {
            l = li;
            a = ai;
          } else {
            l = l * a + li * (1 - a);
            a = Math.max(a, ai);
          }
        }
      }
    }

    if (l == null || a <= 0) continue;
    acc += l * a * (1 - alpha);
    alpha += a * (1 - alpha);
    if (alpha >= 0.98) break;
  }
  // Whatever is still uncovered is the page ground, which is near-white.
  return acc + (1 - alpha) * 0.97;
}

export function useAdaptiveGlass(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const cy = r.top + r.height / 2;
      const points = [0.2, 0.5, 0.8].map((f) => [r.left + r.width * f, cy]);
      let sum = 0;
      let n = 0;
      for (const [x, y] of points) {
        const t = toneAt(x, y, el);
        if (t != null) {
          sum += t;
          n++;
        }
      }
      if (!n) return;
      const tone = sum / n < 0.5 ? "dark" : "light";
      if (el.dataset.tone !== tone) el.dataset.tone = tone;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    schedule();
    // Re-check once images and reveal animations have settled.
    const timers = [400, 1200, 2500].map((ms) => setTimeout(schedule, ms));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mo.disconnect();
    };
  }, [ref]);
}
