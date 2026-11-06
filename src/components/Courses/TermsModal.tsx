"use client";

import type { ReactNode } from "react";

import InfoModal from "../InfoModal";
import TeensRules from "../TeensRules";

// Course rules shown from the teenagers' registration form. The text comes
// from Sanity through the page; the component in code is the fallback.
export default function TermsModal({
  open,
  onClose,
  title = "წესები და პირობები",
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
}) {
  return (
    <InfoModal open={open} onClose={onClose} title={title}>
      {children ?? <TeensRules />}
    </InfoModal>
  );
}
