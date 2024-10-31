"use client";

type ButtonProps = {
  children: React.ReactNode;
  extraStyles?: React.ComponentProps<"div">["className"];
  onClick?: () => void;
} & React.ComponentProps<"button">;

function Button({ children, extraStyles, onClick, ...rest }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{ fontFeatureSettings: "'case' on" }}
      className={`bg-lingo-green text-[#fff] rounded-md self-center p-2 font-bold hover:bg-[#2f904d] ${extraStyles}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
