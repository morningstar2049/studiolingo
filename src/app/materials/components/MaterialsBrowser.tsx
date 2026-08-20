"use client";
import { useState } from "react";
import PdfWrapper from "./PdfWrapper";

type TCategory = "vocabulary" | "grammar";

type TPdf = {
  label: string;
  sub?: string;
  accent: string;
  href: string;
  category: TCategory;
};

const pdfs: TPdf[] = [
  {
    label: "Elementary −",
    sub: "სიტყვები",
    accent: "#3bb85e",
    category: "vocabulary",
    href: "https://drive.google.com/file/d/1YkO8bJ2Ei4ub6viC1E0_9Q7dkLmjIRSF/view?usp=sharing",
  },
  {
    label: "Elementary",
    sub: "სიტყვები",
    accent: "#2f9e4d",
    category: "vocabulary",
    href: "https://drive.google.com/file/d/1apcBAilHUBrurk_WNkoYunzsa-bgOzIA/view?usp=sharing",
  },
  {
    label: "Intermediate",
    sub: "სიტყვები",
    accent: "#1d9e75",
    category: "vocabulary",
    href: "https://drive.google.com/file/d/1aimT85RJteAttw_jKaw3lI07bnLdlgkK/view?usp=sharing",
  },
  {
    label: "Intermediate +",
    sub: "სიტყვები",
    accent: "#1e7d3a",
    category: "vocabulary",
    href: "https://drive.google.com/file/d/1xTi8LudWsjTQB986f59-mwTkuWsnpDjZ/view?usp=sharing",
  },
  {
    label: "არაწესიერი ზმნები",
    accent: "#155e34",
    category: "grammar",
    href: "https://drive.google.com/file/d/1PTcnUW8gJv2uKD_0K2K-KClTdcVdiyG5/view?usp=sharing",
  },
  {
    label: "ფრაზული ზმნები",
    accent: "#2f9e4d",
    category: "grammar",
    href: "https://drive.google.com/file/d/1oiyrr7E0viJSOI_bXaSViCGDNsHKtiJM/view?usp=sharing",
  },
  {
    label: "Gerund თუ Infinitive",
    accent: "#1d9e75",
    category: "grammar",
    href: "https://drive.google.com/file/d/1Qd4O_CR641Y4uGkZvQEXExuMxeemtSvB/view?usp=sharing",
  },
  {
    label: "Make თუ Do",
    accent: "#3bb85e",
    category: "grammar",
    href: "https://drive.google.com/file/d/12qxfEDoSdzPl5sPCZksMwHTfBV75j1ab/view?usp=sharing",
  },
  {
    label: "Make & Let",
    accent: "#1e7d3a",
    category: "grammar",
    href: "https://drive.google.com/file/d/1Nhya4HDXDmeo15jb6N_YtGclJfhSV1jG/view?usp=sharing",
  },
  {
    label: "წინდებულების ფრაზები",
    accent: "#0f766e",
    category: "grammar",
    href: "https://drive.google.com/file/d/1TzHFED_D1i_Axk8uthT0QxKhRneKq0sq/view?usp=sharing",
  },
  {
    label: "დროის და ადგილის წინდებულები",
    accent: "#16a34a",
    category: "grammar",
    href: "https://drive.google.com/file/d/13ALSN-xaZ3aeZqVxUUjLdRNGPOcgOazp/view?usp=sharing",
  },
  {
    label: "ადგილის წინდებულები",
    accent: "#15803d",
    category: "grammar",
    href: "https://drive.google.com/file/d/1b84Xt-MV-OfUyLMOwcZqUq0OF4cxNQi4/view?usp=sharing",
  },
  {
    label: "ზმნა + თანდებული",
    accent: "#047857",
    category: "grammar",
    href: "https://drive.google.com/file/d/1QlxhnI71j4RhzyDOyFwtK4GXEg2avsZy/view?usp=sharing",
  },
];

const tabs: { id: TCategory; label: string }[] = [
  { id: "vocabulary", label: "ლექსიკა" },
  { id: "grammar", label: "გრამატიკა" },
];

function MaterialsBrowser() {
  const [active, setActive] = useState<TCategory>("vocabulary");
  const items = pdfs.filter((p) => p.category === active);

  return (
    <>
      {/* Category switcher */}
      <div className="flex justify-center mb-12 blog-rise-2">
        <div
          role="tablist"
          aria-label="მასალების კატეგორია"
          style={{ fontFeatureSettings: "'case' on" }}
          className="inline-flex p-1 bg-[#f0f3f1] rounded-full"
        >
          {tabs.map((t) => {
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(t.id)}
                className={`px-7 sm:px-10 py-2.5 rounded-full text-sm sm:text-base font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-lingo-green text-[#fff] shadow-[0_8px_20px_-8px_rgba(47,158,77,0.6)]"
                    : "text-[#6b7280] hover:text-lingo-black"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards — keyed by category so they re-animate on switch */}
      <div
        key={active}
        className="grid grid-cols-1 gap-8 justify-items-center sm:grid-cols-2 lg:grid-cols-4"
      >
        {items.map((pdf, i) => (
          <PdfWrapper
            key={pdf.label}
            label={pdf.label}
            sub={pdf.sub}
            accent={pdf.accent}
            href={pdf.href}
            index={i}
          />
        ))}
      </div>
    </>
  );
}

export default MaterialsBrowser;
