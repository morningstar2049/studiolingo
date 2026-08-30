"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaPlay } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";

// Shared course video. Defaults to the promo video; pass a videoId for a
// different clip (e.g. the intro video on top of the description). Thumbnails
// come from YouTube. On desktop the play button opens the video in a large
// lightbox pop-up; on mobile it stays an inline player (native fullscreen).
const WRAP =
  "relative w-full my-4 overflow-hidden shadow-lg aspect-video";
const ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

export default function CourseVideo({
  videoId = "EfRA0MnhFXE",
  rounded = "rounded-xl",
}: {
  videoId?: string;
  rounded?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Mobile (once we know the viewport): plain inline player — single tap to
  // play, with YouTube's native fullscreen button. No pop-up on small screens.
  if (mounted && !isDesktop) {
    return (
      <div className={`${WRAP} ${rounded}`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Studio Lingo — ინგლისურის კურსი"
          className="absolute inset-0 w-full h-full"
          allow={ALLOW}
          allowFullScreen
        />
      </div>
    );
  }

  // Desktop (and the pre-mount default): a thumbnail that opens a lightbox.
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="ვიდეოს ჩართვა"
        className={`${WRAP} ${rounded} block cursor-pointer group`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
          alt=""
          className="absolute inset-0 object-cover w-full h-full"
        />
        <span className="absolute inset-0 transition-colors bg-[#0d132226] group-hover:bg-[#0d132240]" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex items-center justify-center rounded-full w-[68px] h-[68px] pl-1 bg-[#ff0000] shadow-[0_8px_24px_-6px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-110">
            <FaPlay className="text-[26px] text-[#fff]" />
          </span>
        </span>
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-10 bg-[#0a0e17ee] backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="დახურვა"
              className="absolute flex items-center justify-center rounded-full top-5 right-5 w-11 h-11 text-[#fff] bg-[#ffffff1f] hover:bg-[#ffffff33]"
            >
              <AiOutlineClose className="text-xl" />
            </button>
            <div
              className="w-full max-w-5xl overflow-hidden shadow-2xl aspect-video rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="Studio Lingo — ინგლისურის კურსი"
                className="w-full h-full"
                allow={ALLOW}
                allowFullScreen
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
