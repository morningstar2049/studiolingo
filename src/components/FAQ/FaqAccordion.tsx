"use client";

import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { faqs } from "./faqData";

const accordionSx = {
  background: "transparent",
  boxShadow: "none",
  marginBottom: "14px",
  fontFamily: "'FiraGO', sans-serif",
  "&:before": { display: "none" },
  "&.Mui-expanded": { margin: "0 0 14px 0" },
};

const summarySx = {
  minHeight: 0,
  padding: "16px 20px",
  background: "#fff",
  border: "1px solid #eceef2",
  borderRadius: "16px",
  transition: "border-color .25s, box-shadow .25s",
  boxShadow: "0 12px 28px -18px rgba(41,49,66,0.22)",
  "&:hover": { borderColor: "#bfe6cb" },
  "&.Mui-expanded": {
    borderColor: "#bfe6cb",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  "& .MuiAccordionSummary-content, & .MuiAccordionSummary-content.Mui-expanded": {
    alignItems: "center",
    gap: "14px",
    margin: 0,
  },
  "& .faq-ic": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    borderRadius: "50%",
    border: "1.5px solid #dbe0e6",
    color: "#2f9e4d",
    transition: "all .25s",
  },
  "&:hover .faq-ic, &.Mui-expanded .faq-ic": {
    background: "#2f9e4d",
    borderColor: "#2f9e4d",
    color: "#fff",
  },
};

const detailsSx = {
  padding: "18px 20px 22px",
  background: "#fff",
  border: "1px solid #bfe6cb",
  borderTop: "none",
  borderBottomLeftRadius: "16px",
  borderBottomRightRadius: "16px",
  color: "#3a4657",
  fontFamily: "'FiraGO', sans-serif",
  fontSize: "15px",
};

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | false>(false);

  return (
    <div className="w-full">
      {faqs.map((faq, i) => (
        <Accordion
          key={faq.q}
          disableGutters
          elevation={0}
          expanded={open === i}
          sx={accordionSx}
          onChange={(_, isExpanded) => setOpen(isExpanded ? i : false)}
        >
          <AccordionSummary
            expandIcon={
              <span className="faq-ic">
                <ExpandMoreIcon />
              </span>
            }
            sx={summarySx}
            aria-controls={`faq-panel-${i}`}
            id={`faq-header-${i}`}
          >
            <span className="text-[15px] sm:text-base font-bold text-lingo-black">
              {faq.q}
            </span>
          </AccordionSummary>
          <AccordionDetails sx={detailsSx}>{faq.a}</AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
