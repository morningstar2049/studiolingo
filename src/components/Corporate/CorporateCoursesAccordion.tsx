"use client";

import { useEffect, useRef, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "../Button";

// Same premium card styling as the main Courses accordion so the corporate
// section reads as one consistent design language.
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

const businessTopics = [
  "ფინანსები და ბუღალტერია",
  "მარკეტინგი",
  "ადამიანური რესურსები (HR)",
  "ბიზნეს სამართალი",
  "ლოჯისტიკა",
];

const SYLLABUS_URL =
  "https://docs.google.com/document/d/1FjS25q9cRhJZ14XZ149VGtMMCOT-hLQWaRSEV8j8p4I/edit?fbclid=IwAR2sLPjvhRfhvr07X2dTRw9HiZlLn4tYGl0OHQIZrW8pQx_tiiEP2AIv7fg#heading=h.y286pqovbf7j";
const SIGNUP_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdnC-n4UDzM2mqdtvbK9KxgXK0oTqf6bSMuNkY8YlhMaHpk2Q/viewform";

// Expanding scrolls the card up so the details open in view, clear of the
// sticky header — mirrors the main Courses accordion behaviour.
function scrollToOnExpand(el: HTMLElement | null) {
  if (!el || typeof window === "undefined") return;
  window.setTimeout(() => {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 120);
}

export default function CorporateCoursesAccordion() {
  const ref = useRef<HTMLDivElement>(null);
  // Open by default (matches SSR / desktop); collapse on mobile after mount.
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 640) setExpanded(false);
  }, []);

  return (
    <div
      style={{ fontFeatureSettings: "'case' on" }}
      className="w-full p-3 sm:p-0 sm:w-[48%] self-center"
    >
      <Accordion
        ref={ref}
        disableGutters
        elevation={0}
        expanded={expanded}
        sx={accordionSx}
        onChange={(_, isExpanded) => {
          setExpanded(isExpanded);
          if (isExpanded) scrollToOnExpand(ref.current);
        }}
      >
        <AccordionSummary
          expandIcon={
            <span className="cv-circle">
              <ExpandMoreIcon />
            </span>
          }
          sx={summarySx}
          aria-controls="corporate-panel-content"
          id="corporate-panel-header"
        >
          <span
            className="flex items-center justify-center w-[52px] h-[52px] rounded-[15px] text-[#fff] shrink-0 course-ic"
            style={{ background: "linear-gradient(135deg,#3bb85e,#2f9e4d)" }}
          >
            <CorporateFareIcon sx={{ fontSize: 26 }} />
          </span>
          <span className="flex-1">
            <span className="block font-bold text-lingo-black text-[17px] sm:text-lg">
              კორპორაციული ინგლისური
            </span>
            <span className="block mt-1 text-[11px] tracking-[0.09em] uppercase text-[#9aa2ad]">
              ბიზნესისთვის · A1–C1
            </span>
          </span>
        </AccordionSummary>

        <AccordionDetails sx={{ padding: "20px 6px 6px" }}>
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-2">
              <strong className="text-lingo-green">ზოგადი / სასაუბრო</strong>
              <p className="text-[15px] leading-relaxed text-[#4b5563]">
                კურსის განმავლობაში ისწავლით ბუნებრივად საუბარს, უცხოელი
                პარტნიორების თავისუფლად გაგებას, დახვეწილი ენით წერას და
                გამართულად წაკითხვას.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <strong className="text-lingo-green">ბიზნესი</strong>
              <p className="text-[15px] leading-relaxed text-[#4b5563]">
                კურსის განმავლობაში გაივლით ინგლისურად არაერთ პრაქტიკულ თემას:
              </p>
              <div className="flex flex-wrap gap-2">
                {businessTopics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full bg-[#eaf6ee] px-3 py-1.5 text-[12px] font-bold text-[#1f7d3a]"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              <a
                href={SYLLABUS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-lingo-green transition-colors hover:text-[#1f7d3a]"
              >
                <DescriptionOutlinedIcon sx={{ fontSize: 18 }} />
                კურსის სილაბუსი
                <ArrowForwardIcon sx={{ fontSize: 16 }} />
              </a>
            </div>

            <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
              <Button extraStyles="w-full m-auto">შემოგვიერთდი</Button>
            </a>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
