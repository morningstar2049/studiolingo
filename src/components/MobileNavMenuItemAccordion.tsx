"use client";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { TNavItem } from "./Navbar";
import Link from "next/link";

type TProps = {
  menuItems: Omit<TNavItem, "menuItems">[];
  onClick: () => void;
};

function MobileNavMenuItemAccordion({ menuItems, onClick }: TProps) {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Accordion
      disableGutters
      elevation={0}
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
      className="text-lingo-green"
      sx={{
        // Hug the content and pin left so კურსები aligns with the other
        // (left-aligned) menu items instead of centering in a full-width row.
        width: "fit-content",
        maxWidth: "100%",
        alignSelf: "flex-start",
        fontFamily: "var(--font-firago), sans-serif",
        // Strip MUI's default paper "box" so კურსები reads as a plain item.
        background: "transparent",
        boxShadow: "none",
        "&:before": { display: "none" },
        "&.Mui-expanded": { margin: 0 },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "rgb(47 158 77)" }} />}
        sx={{
          "&.MuiAccordionSummary-root": {
            minHeight: 0,
            padding: 0,
            justifyContent: "flex-start",
          },
          "& .MuiAccordionSummary-content": {
            margin: 0,
            flexGrow: 0,
            justifyContent: "flex-start",
          },
          "& .MuiAccordionSummary-expandIconWrapper": { marginLeft: "4px" },
        }}
      >
        <div
          className={`${
            expanded
              ? "text-[#fff] bg-lingo-green rounded-md"
              : "text-lingo-green"
          } p-2 transition-all`}
        >
          კურსები
        </div>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: "12px 0 4px" }}>
        <div className="flex flex-col gap-1 p-2 w-[280px] max-w-[calc(100vw-128px)] bg-[#fff] border border-[#eceef2] rounded-2xl shadow-[0_16px_34px_-18px_rgba(41,49,66,0.28)]">
          {menuItems.map((item) => (
            <Link href={item.href!} key={item.name} onClick={onClick}>
              <div className="flex items-center gap-3 px-2 py-2 transition-colors rounded-xl active:bg-[#f2faf5]">
                <span className="flex items-center justify-center w-11 h-11 shrink-0 rounded-[12px] bg-[#eaf6ee] text-lingo-green">
                  {item.icon}
                </span>
                <span className="flex flex-col">
                  <span className="text-[15px] font-bold leading-tight text-lingo-black">
                    {item.name}
                  </span>
                  {item.description && (
                    <span className="text-[12px] font-normal text-[#8a929d] mt-0.5">
                      {item.description}
                    </span>
                  )}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default MobileNavMenuItemAccordion;
