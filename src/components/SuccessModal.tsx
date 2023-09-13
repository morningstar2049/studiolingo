"use client";
import { Modal } from "@mui/material";
import React, { useState } from "react";

type SuccessModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

function SuccessModal({ isOpen, setIsOpen, children }: SuccessModalProps) {
  return (
    <>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[80%] h-[50%] lg:w-[40%] lg:h-[40%] bg-[#fff] rounded-sm flex items-center justify-center shadow-lg">
          {children}
        </div>
      </Modal>
    </>
  );
}

export default SuccessModal;
