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
    <>
      <Accordion
        className="ml-[-25px] self-start shadow-none text-lingo-green"
        disableGutters={true}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{
          alignSelf: "flex-start",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "rgb(47 158 77)" }} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div
            className={`${
              expanded ? "text-[#fff] bg-lingo-green rounded-md" : ""
            } px-4 py-1 transition-all`}
          >
            კურსები
          </div>
        </AccordionSummary>
        <AccordionDetails className="flex flex-col gap-5 text-lingo-black">
          {menuItems.map((item) => (
            <Link
              href={item.href!}
              className="text-[16px] px-5"
              key={item.name}
            >
              <p onClick={onClick}>{item.name}</p>
            </Link>
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default MobileNavMenuItemAccordion;
