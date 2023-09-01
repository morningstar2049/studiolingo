import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  bg?: "white" | "green";
};

export default function Button({ children, ...props }: ButtonProps) {
  const bgVariants = {
    green: "bg-lingo-green text-[#fff]",
    white: "bg-white text-black",
  };

  return (
    <button className={`px-6 py-3 rounded-3xl ${bgVariants[props.bg!]}`}>
      {children}
    </button>
  );
}
