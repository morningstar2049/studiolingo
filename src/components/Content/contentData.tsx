import type { ReactNode } from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export type Platform = {
  name: string;
  handle: string;
  href: string;
  icon: ReactNode;
  from: string;
  to: string;
  // Optional full multi-stop gradient that overrides `from`/`to` (e.g. Instagram).
  gradient?: string;
  blurb: string;
};

export const platforms: Platform[] = [
  {
    name: "YouTube",
    handle: "@studio_lingo",
    href: "https://www.youtube.com/@studio_lingo",
    icon: <FaYoutube />,
    from: "#ff3b34",
    to: "#e60000",
    blurb: "სრული გაკვეთილები, გრამატიკა და სახალისო ვიდეოები",
  },
  {
    name: "Instagram",
    handle: "@studio_lingo",
    href: "https://www.instagram.com/studio_lingo/",
    icon: <FaInstagram />,
    from: "#f9ce34",
    to: "#ee2a7b",
    gradient:
      "linear-gradient(135deg,#feda75 0%,#fa7e1e 28%,#d62976 55%,#962fbf 78%,#4f5bd5 100%)",
    blurb: "ყოველდღიური რილსები, სიტყვები და ფრაზები",
  },
  {
    name: "TikTok",
    handle: "@studio.lingo",
    href: "https://www.tiktok.com/@studio.lingo",
    icon: <FaTiktok />,
    from: "#2b2b2b",
    to: "#000000",
    blurb: "მოკლე, სახალისო და ვირუსული ინგლისური",
  },
  {
    name: "Facebook",
    handle: "Studio Lingo",
    href: "https://www.facebook.com/studiolingo",
    icon: <FaFacebookF />,
    from: "#4293f5",
    to: "#1877f2",
    blurb: "მოკლე და მარტივი ვიდეოები და ფრაზები",
  },
];

// Real videos from the Studio Lingo YouTube channel (UC_AZl3z7OrjUqWjaHwFiBBg).
export const featuredVideo = "6bjGfygQ500"; // ინგლისურის წინდებულები IN ON AT
export const gridVideos = [
  "iSApXqvejxs",
  "mW4dIsjxofY",
  "BE2-9_pLXIk",
  "nPvdHQ9htKM",
  "aAUJGIX0loc",
  "oM7W36LbBsA",
];

export const YT_CHANNEL = "https://www.youtube.com/@studio_lingo";
export const TOTAL_SUBS = 300000;
