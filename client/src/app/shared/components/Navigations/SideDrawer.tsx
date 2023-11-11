"use client";
import React, { useState, useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from "react-transition-group"; 

interface SideDrawerProps {
  show: boolean;
  onClick: () => void;
  children: ReactNode;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ show, onClick, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const content = (
    <aside className="fixed right-0 top-0 z-40 h-screen w-70 bg-[#2C2F33] flex flex-col shadow-md sm:hidden" onClick={onClick}>
      {children}
    </aside>
  );

  return mounted ? ReactDOM.createPortal(
    <CSSTransition in={show} timeout={200} classNames="slide-in-right" mountOnEnter unmountOnExit>
      {content}
    </CSSTransition>,
    document.getElementById("drawer-hook")!
  ) : null;
};

export default SideDrawer;
