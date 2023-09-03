"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export const MobileMenuContext = createContext<IContext>({
  isOpen: false,
  handleOpen: () => {},
  handleClose: () => {},
});

interface IContext {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

export function MobileMenuContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }

  function handleClose() {
    setIsOpen(false);
    document.body.style.overflow = "visible";
  }

  return (
    <MobileMenuContext.Provider value={{ isOpen, handleOpen, handleClose }}>
      {children}
    </MobileMenuContext.Provider>
  );
}
