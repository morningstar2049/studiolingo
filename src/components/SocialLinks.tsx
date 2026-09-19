import { SOCIALS } from "./socials";

// Round social icons in each platform's own brand colour, with a white glyph.
// Shared by the desktop header and the mobile menu.
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
      {SOCIALS.map(({ href, label, Icon, background }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          style={{ background }}
          className={`flex items-center justify-center rounded-full text-[#fff] transition-transform hover:scale-110 ${circleClass}`}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
