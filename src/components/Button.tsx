import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  bg?: "white" | "green";
  onClick: () => void;
};

export default function Button({ children, ...props }: ButtonProps) {
  const bgVariants = {
    green: "bg-lingo-green text-[#fff]",
    white: "text-black border-solid border-1 border-lingo-green",
  };

  return (
    <button
      onClick={props.onClick}
      className={`px-6 py-3 rounded-3xl ${bgVariants[props.bg!]}`}
    >
      {children}
    </button>
  );
}
