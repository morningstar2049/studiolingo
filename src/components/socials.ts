import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import type { IconType } from "react-icons";

// The school's social accounts, with each platform's own brand colour, shared
// by the desktop header, the mobile menu and the footer. `background` goes on
// the circle (Instagram's is its official gradient) and the glyph stays white.
export type Social = {
  href: string;
  label: string;
  Icon: IconType;
  background: string;
};

export const SOCIALS: Social[] = [
  {
    href: "https://www.facebook.com/studiolingo",
    label: "Facebook",
    Icon: FaFacebookF,
    background: "#1877f2",
  },
  {
    href: "https://www.instagram.com/studio_lingo/",
    label: "Instagram",
    Icon: FaInstagram,
    background:
      "radial-gradient(circle at 28% 108%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%)",
  },
  {
    href: "https://www.tiktok.com/@studio.lingo",
    label: "TikTok",
    Icon: FaTiktok,
    background: "#010101",
  },
  {
    href: "https://www.youtube.com/@studio_lingo",
    label: "YouTube",
    Icon: FaYoutube,
    background: "#ff0000",
  },
  {
    href: "https://www.linkedin.com/company/studio-lingo/",
    label: "LinkedIn",
    Icon: FaLinkedinIn,
    background: "#0a66c2",
  },
];
