"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";
import CourseDetails from "./CourseDetails";
import RevealOnScroll from "@/components/RevealOnScroll";

const accordionSx = {
  background: "transparent",
  boxShadow: "none",
  marginBottom: "16px",
  scrollMarginTop: { xs: "90px", sm: "160px" },
  "&:before": { display: "none" },
  "&.Mui-expanded": { margin: "0 0 16px 0" },
};

const summarySx = {
  minHeight: 0,
  padding: "14px 18px",
  background: "#fff",
  border: "1px solid #eceef2",
  borderRadius: "18px",
  boxShadow: "0 14px 30px -18px rgba(41,49,66,0.22)",
  transition: "transform .25s, box-shadow .25s, border-color .25s",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 24px 44px -18px rgba(47,158,77,0.34)",
    borderColor: "#bfe6cb",
  },
  "& .MuiAccordionSummary-content, & .MuiAccordionSummary-content.Mui-expanded": {
    alignItems: "center",
    gap: "16px",
    margin: 0,
  },
  "& .cv-circle": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 42,
    height: 42,
    borderRadius: "50%",
    border: "1.5px solid #dbe0e6",
    color: "#2f9e4d",
    transition: "all .25s",
  },
  "&:hover .cv-circle": {
    background: "#2f9e4d",
    borderColor: "#2f9e4d",
    color: "#fff",
  },
};

// Expanding a course scrolls it up so the description opens in view (mobile
// and desktop). scrollMarginTop keeps it clear of the sticky header.
function scrollToOnExpand(el: HTMLElement | null) {
  if (!el || typeof window === "undefined") return;
  window.setTimeout(() => {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 120);
}

function Header({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <>
      <span
        className="flex items-center justify-center w-[52px] h-[52px] rounded-[15px] text-[#fff] shrink-0 course-ic"
        style={{ background: "linear-gradient(135deg,#3bb85e,#2f9e4d)" }}
      >
        {icon}
      </span>
      <span className="flex-1">
        <span className="block font-bold text-lingo-black text-[17px] sm:text-lg">
          {title}
        </span>
        <span className="block mt-1 text-[11px] tracking-[0.09em] uppercase text-[#9aa2ad]">
          {subtitle}
        </span>
      </span>
    </>
  );
}

export default function CoursesAccordion() {
  const adultsRef = useRef<HTMLDivElement>(null);
  const teensRef = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{ fontFeatureSettings: "'case' on" }}
      className="w-full p-3 sm:p-0 sm:w-[48%] self-center"
    >
      <RevealOnScroll className="mb-5">
        <h2 className="text-2xl font-bold text-center sm:text-3xl text-lingo-black">
          ჩვენი ინგლისურის კურსები
        </h2>
      </RevealOnScroll>
      <Accordion
        ref={adultsRef}
        disableGutters
        elevation={0}
        sx={accordionSx}
        onChange={(_, expanded) => {
          if (expanded) scrollToOnExpand(adultsRef.current);
        }}
      >
        <AccordionSummary
          expandIcon={
            <span className="cv-circle">
              <ExpandMoreIcon />
            </span>
          }
          sx={summarySx}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Header
            icon={<MenuBookIcon sx={{ fontSize: 26 }} />}
            title="ინგლისურის კურსები"
            subtitle="ზრდასრულებისთვის · A1–C1"
          />
        </AccordionSummary>
        <AccordionDetails>
          <CourseDetails courseTitle="english" />
        </AccordionDetails>
      </Accordion>

      <Accordion
        ref={teensRef}
        disableGutters
        elevation={0}
        sx={accordionSx}
        onChange={(_, expanded) => {
          if (expanded) scrollToOnExpand(teensRef.current);
        }}
      >
        <AccordionSummary
          expandIcon={
            <span className="cv-circle">
              <ExpandMoreIcon />
            </span>
          }
          sx={summarySx}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Header
            icon={<SchoolIcon sx={{ fontSize: 26 }} />}
            title="ინგლისური მოზარდებისთვის"
            subtitle="მოზარდებისთვის · 12–16 წელი"
          />
        </AccordionSummary>
        <AccordionDetails>
          <CourseDetails courseTitle="englishForTeens" />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
