"use client";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import InfoModal from "../InfoModal";
import { SOCIALS } from "../socials";
import type { FooterData } from "@/lib/loadFooter";

// Everything here (text, contacts, links, legal windows) comes from Sanity
// ("ფუტერი"), loaded on the server and handed down as props.
const linkClass =
  "text-sm text-[#c3c9d4] transition-colors hover:text-lingo-green";

function Footer({ data }: { data: FooterData }) {
  const [openModal, setOpenModal] = useState<"terms" | "privacy" | null>(null);

  const modal: Record<"terms" | "privacy", { title: string; body: ReactNode }> =
    {
      terms: { title: data.termsTitle, body: data.terms },
      privacy: { title: data.privacyTitle, body: data.privacy },
    };

  return (
    <>
      <footer id="contact" className="mt-20 bg-lingo-black text-[#fff]">
        <div
          className="w-full h-[3px]"
          style={{
            background: "linear-gradient(90deg,#2f9e4d,#5fd07b,#2f9e4d)",
          }}
        />
        <div className="max-w-6xl px-6 py-12 mx-auto">
          <div className="flex flex-col items-center gap-10 text-center md:flex-row md:items-start md:justify-between md:text-left">
            <div className="max-w-xs">
              <div className="text-[26px] font-bold leading-none">
                <span className="text-[#fff]">studio</span>
                <span className="text-lingo-green">lingo</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#9aa5b4]">
                {data.tagline}
              </p>
              <div className="flex justify-center gap-3 mt-5 md:justify-start">
                {SOCIALS.map(({ href, label, Icon, background }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    style={{ background }}
                    // The hairline keeps the black TikTok circle visible on the
                    // dark footer.
                    className="flex items-center justify-center w-10 h-10 text-[#fff] transition-transform rounded-full ring-1 ring-[rgba(255,255,255,0.18)] hover:scale-110"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 md:items-start">
              <h3
                style={{ fontFeatureSettings: "'case' on" }}
                className="text-base font-bold tracking-[0.08em]"
              >
                {data.contactHeading}
              </h3>
              <a
                href={`tel:${data.phone.replace(/[^+\d]/g, "")}`}
                className={`flex items-center gap-2 ${linkClass}`}
              >
                <FiPhone className="text-lg text-lingo-green" strokeWidth={2.6} />
                {data.phone}
              </a>
              <a
                href={`mailto:${data.email}`}
                className={`flex items-center gap-2 ${linkClass}`}
              >
                <FiMail className="text-lg text-lingo-green" strokeWidth={2.6} />
                {data.email}
              </a>
              <a
                href={data.mapUrl}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-2 ${linkClass}`}
              >
                <FiMapPin className="text-lg text-lingo-green" strokeWidth={2.6} />
                {data.address}
              </a>
            </div>

            <div className="flex flex-col items-center gap-2.5 md:items-start">
              <h3
                style={{ fontFeatureSettings: "'case' on" }}
                className="mb-0.5 text-base font-bold tracking-[0.08em]"
              >
                {data.linksHeading}
              </h3>
              {data.links.map((link) =>
                link.kind === "page" ? (
                  <Link
                    key={link.label}
                    href={link.href || "/"}
                    className={linkClass}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    onClick={() =>
                      setOpenModal(link.kind === "terms" ? "terms" : "privacy")
                    }
                    className={linkClass}
                  >
                    {link.label}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="pt-6 mt-10 text-sm text-center border-t border-[#ffffff14] text-[#7c8598]">
            {data.copyright}
          </div>
        </div>
      </footer>
      <InfoModal
        open={openModal !== null}
        onClose={() => setOpenModal(null)}
        title={openModal ? modal[openModal].title : ""}
      >
        {openModal ? modal[openModal].body : null}
      </InfoModal>
    </>
  );
}

export default Footer;
