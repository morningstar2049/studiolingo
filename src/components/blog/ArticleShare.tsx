"use client";

import { useState } from "react";
import {
  FaFacebookF,
  FaWhatsapp,
  FaTelegramPlane,
  FaLinkedinIn,
} from "react-icons/fa";
import { FiLink, FiCheck } from "react-icons/fi";

type Props = { url: string; title: string };

// Official X (formerly Twitter) mark. Inlined because this react-icons
// version predates FaXTwitter.
const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function ArticleShare({ url, title }: Props) {
  const [copied, setCopied] = useState(false);
  const e = encodeURIComponent;

  const channels = [
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${e(url)}`,
      icon: <FaFacebookF />,
      bg: "#1877F2",
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?url=${e(url)}&text=${e(title)}`,
      icon: <XIcon />,
      bg: "#000000",
    },
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${e(`${title} ${url}`)}`,
      icon: <FaWhatsapp />,
      bg: "#25D366",
    },
    {
      name: "Telegram",
      href: `https://t.me/share/url?url=${e(url)}&text=${e(title)}`,
      icon: <FaTelegramPlane />,
      bg: "#229ED9",
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${e(url)}`,
      icon: <FaLinkedinIn />,
      bg: "#0A66C2",
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard may be blocked; silently ignore
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="mr-1 text-sm font-bold text-lingo-black">გააზიარე:</span>
      {channels.map((c) => (
        <a
          key={c.name}
          href={c.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={c.name}
          title={c.name}
          className="flex items-center justify-center w-10 h-10 text-[#fff] transition-transform rounded-full hover:scale-110"
          style={{ backgroundColor: c.bg }}
        >
          {c.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        aria-label="ბმულის კოპირება"
        title={copied ? "დაკოპირდა" : "ბმულის კოპირება"}
        className="flex items-center justify-center w-10 h-10 transition-transform rounded-full bg-lingo-black text-[#fff] hover:scale-110"
      >
        {copied ? <FiCheck /> : <FiLink />}
      </button>
    </div>
  );
}
