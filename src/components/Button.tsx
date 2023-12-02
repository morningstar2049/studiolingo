"use client";

import { HTMLProps } from "react";

type ButtonProps = {
  children: React.ReactNode;
  extraStyles?: React.ComponentProps<"div">["className"];
  onClick?: () => void;
};

function Button({ children, extraStyles, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{ fontFeatureSettings: "'case' on" }}
      className={`bg-lingo-green text-[#fff] rounded-md self-center p-2 font-bold hover:bg-[#2f904d] ${extraStyles}`}
    >
      {children}
    </button>
  );
}

export default Button;
