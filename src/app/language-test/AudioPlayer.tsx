"use client";
import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const fmt = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

// Styled wrapper around a native <audio> element — same playback, premium UI.
export default function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => {
      setCurrent(a.currentTime);
      setProgress(a.duration ? a.currentTime / a.duration : 0);
    };
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
      setCurrent(0);
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    a.addEventListener("pause", () => setPlaying(false));
    a.addEventListener("play", () => setPlaying(true));
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);
    };
  }, [src]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play();
    else a.pause();
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-[#f6f8f7] rounded-xl">
      <audio ref={audioRef} src={src} preload="metadata" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "პაუზა" : "დაკვრა"}
        className="flex items-center justify-center text-[#fff] rounded-full appearance-none w-10 h-10 bg-lingo-green shrink-0 transition-transform hover:scale-105"
      >
        {playing ? <FaPause /> : <FaPlay className="ml-0.5" />}
      </button>
      <div className="flex-1 h-1.5 bg-[#dbe3de] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-lingo-green"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <span className="text-[11px] text-[#8a929d] shrink-0 tabular-nums">
        {fmt(current)}
      </span>
    </div>
  );
}
