"use client";

import { useEffect, useRef, useState } from "react";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";

// The intro video at the top of /courses. It starts on its own, which browsers
// only allow while the player is muted, so it autoplays silently and the button
// turns the sound on through the YouTube iframe API. Phones get the vertical
// cut and desktop the wide one; only the matching player is mounted, so a
// visitor downloads one video and not both. The wrapper carries both aspect
// ratios in CSS, so the box is the right shape before the script decides which
// clip to load and nothing jumps.
// Both clips are edited in Sanity ("კურსების გვერდი"); these are the fallback
// for when the field is empty or Sanity is unreachable.
export const FALLBACK_DESKTOP_ID = "B8kWNBVExuE";
export const FALLBACK_MOBILE_ID = "skQ08owSCvo";

const ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

const params = (id: string) =>
  new URLSearchParams({
    autoplay: "1",
    mute: "1",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    enablejsapi: "1",
  }).toString();

export default function CoursesIntroVideo({
  desktopId = FALLBACK_DESKTOP_ID,
  mobileId = FALLBACK_MOBILE_ID,
}: {
  desktopId?: string;
  mobileId?: string;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const toggleSound = () => {
    const win = frame.current?.contentWindow;
    if (!win) return;
    win.postMessage(
      JSON.stringify({
        event: "command",
        func: muted ? "unMute" : "mute",
        args: [],
      }),
      "*",
    );
    setMuted(!muted);
  };

  const videoId = isDesktop ? desktopId : mobileId;

  return (
    <div className="mb-12">
      <div className="relative w-full mx-auto overflow-hidden bg-lingo-black max-w-[340px] aspect-[9/16] rounded-2xl sm:max-w-none sm:aspect-video">
        {isDesktop !== null && (
          <iframe
            ref={frame}
            key={videoId}
            src={`https://www.youtube.com/embed/${videoId}?${params(videoId)}`}
            title="Studio Lingo — ინგლისურის კურსები"
            className="absolute inset-0 w-full h-full"
            allow={ALLOW}
            allowFullScreen
          />
        )}

        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "ხმის ჩართვა" : "ხმის გამორთვა"}
          className="absolute z-10 flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-full bottom-4 left-4 text-[#fff] bg-[#0d1322b3] hover:bg-[#0d1322e6] backdrop-blur-sm"
        >
          {muted ? (
            <>
              <HiMiniSpeakerXMark className="text-lg" />
              ხმის ჩართვა
            </>
          ) : (
            <HiMiniSpeakerWave className="text-lg text-lingo-green" />
          )}
        </button>
      </div>
    </div>
  );
}
