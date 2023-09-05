"use client";

type ButtonProps = {
  children: React.ReactNode;
  extraStyles?: string;
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
