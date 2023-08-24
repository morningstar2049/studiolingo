"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export const MobileMenuContext = createContext<IContext>({
  isOpen: false,
  setIsOpen: () => {},
});

interface IContext {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function MobileMenuContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MobileMenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MobileMenuContext.Provider>
  );
}
