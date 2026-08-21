"use client";

import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import FaqAccordion from "./FaqAccordion";

// Course-page CTA: opens the FAQ in a premium dialog (no separate navigation).
export default function FaqButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{ fontFeatureSettings: "'case' on" }}
        className="inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 text-[15px] font-bold transition-colors border rounded-xl text-lingo-green border-lingo-green hover:bg-[#eaf6ee]"
      >
        <AiOutlineQuestionCircle className="text-lg" />
        ხშირად დასმული კითხვები
      </button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
        scroll="paper"
        PaperProps={{
          sx: {
            borderRadius: "22px",
            background: "#eef7f1",
            backgroundImage: "none",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontFamily: "'FiraGO', sans-serif",
            fontWeight: 700,
            fontFeatureSettings: "'case' on",
            pr: 6,
            color: "#293142",
          }}
        >
          ხშირად დასმული კითხვები
          <IconButton
            aria-label="დახურვა"
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 10, top: 10, color: "#7c8598" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{ fontFamily: "'FiraGO', sans-serif", borderColor: "#dbe6df" }}
        >
          <div className="pt-2">
            <FaqAccordion />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
