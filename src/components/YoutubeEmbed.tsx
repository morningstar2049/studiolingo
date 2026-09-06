"use client";

import { useEffect, useRef } from "react";

const ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

type Props = {
  videoId: string;
  title?: string;
  /** Extra query params for the embed URL (e.g. "autoplay=1"). */
  params?: string;
  /** Use the privacy-enhanced youtube-nocookie.com host. */
  noCookie?: boolean;
  /** Classes for the wrapper; the iframe fills it. */
  className?: string;
  /**
   * On phones, jump to fullscreen automatically as soon as the visitor presses
   * play, and leave fullscreen when the video ends. Defaults to on.
   */
  fullscreenOnPlay?: boolean;
};

type FsElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};
type FsDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
};

// YouTube iframe with the player API switched on so we can react to playback
// state from the parent page (the player posts JSON messages to us).
export default function YoutubeEmbed({
  videoId,
  title = "YouTube video",
  params = "",
  noCookie = false,
  className = "relative w-full overflow-hidden aspect-video",
  fullscreenOnPlay = true,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const host = noCookie
    ? "https://www.youtube-nocookie.com"
    : "https://www.youtube.com";
  // playsinline=0 asks YouTube to play fullscreen on iPhone/iPad instead of inline.
  const query = ["enablejsapi=1", "playsinline=0", params]
    .filter(Boolean)
    .join("&");
  const src = `${host}/embed/${videoId}?${query}`;

  useEffect(() => {
    if (!fullscreenOnPlay) return;
    const iframe = iframeRef.current;
    const wrap = wrapRef.current;
    if (!iframe || !wrap) return;

    // Phones only. Desktop keeps the normal inline player.
    const isPhone = window.matchMedia("(max-width: 639px)").matches;
    if (!isPhone) return;

    // Ask the player to start streaming its state to us.
    const subscribe = () => {
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: "listening", id: videoId, channel: "widget" }),
        host,
      );
    };

    const enterFullscreen = () => {
      const doc = document as FsDocument;
      if (doc.fullscreenElement || doc.webkitFullscreenElement) return;
      const el = wrap as FsElement;
      const req = el.requestFullscreen
        ? el.requestFullscreen.bind(el)
        : el.webkitRequestFullscreen?.bind(el);
      // May be refused (no user activation, unsupported on iPhone) — that's
      // fine, the visitor still has YouTube's own fullscreen button.
      Promise.resolve(req?.()).catch(() => {});
    };

    const exitFullscreen = () => {
      const doc = document as FsDocument;
      const active = doc.fullscreenElement || doc.webkitFullscreenElement;
      if (!active || !wrap.contains(active)) return;
      const exit = doc.exitFullscreen
        ? doc.exitFullscreen.bind(doc)
        : doc.webkitExitFullscreen?.bind(doc);
      Promise.resolve(exit?.()).catch(() => {});
    };

    const onMessage = (e: MessageEvent) => {
      if (e.source !== iframe.contentWindow) return;
      let data: { event?: string; info?: unknown } | null = null;
      try {
        data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      if (!data) return;
      // State arrives either as onStateChange (info = state) or inside
      // infoDelivery (info.playerState). 1 = playing, 0 = ended.
      let state: number | undefined;
      if (data.event === "onStateChange" && typeof data.info === "number") {
        state = data.info;
      } else if (
        data.event === "infoDelivery" &&
        data.info &&
        typeof (data.info as { playerState?: unknown }).playerState === "number"
      ) {
        state = (data.info as { playerState: number }).playerState;
      }
      if (state === 1) enterFullscreen();
      if (state === 0) exitFullscreen();
    };

    window.addEventListener("message", onMessage);
    iframe.addEventListener("load", subscribe);
    // The iframe may already be loaded by the time this effect runs.
    subscribe();
    return () => {
      window.removeEventListener("message", onMessage);
      iframe.removeEventListener("load", subscribe);
    };
  }, [fullscreenOnPlay, host, videoId]);

  return (
    <div ref={wrapRef} className={className}>
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        className="absolute inset-0 w-full h-full"
        allow={ALLOW}
        allowFullScreen
      />
    </div>
  );
}
