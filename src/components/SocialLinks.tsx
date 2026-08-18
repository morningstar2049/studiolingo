import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import type { IconType } from "react-icons";

// Uniform round social icons — a white brand glyph on a green circle — so
// every platform matches (Facebook was already a green circle; the rest now
// follow the same shape). Shared by the desktop header and the mobile menu.
const socials: { href: string; label: string; Icon: IconType }[] = [
  { href: "https://www.facebook.com/studiolingo", label: "Facebook", Icon: FaFacebookF },
  { href: "https://www.instagram.com/studio_lingo/", label: "Instagram", Icon: FaInstagram },
  { href: "https://www.tiktok.com/@studio.lingo", label: "TikTok", Icon: FaTiktok },
  { href: "https://www.linkedin.com/company/studio-lingo/", label: "LinkedIn", Icon: FaLinkedinIn },
  { href: "https://www.youtube.com/@studio_lingo", label: "YouTube", Icon: FaYoutube },
];

type Props = {
  className?: string;
  circleClass?: string;
};

export default function SocialLinks({
  className = "",
  circleClass = "h-11 w-11 text-xl",
}: Props) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socials.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`flex items-center justify-center rounded-full bg-lingo-green text-[#fff] transition-transform hover:scale-110 ${circleClass}`}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
