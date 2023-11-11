"use client";
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface BackdropProps {
  onClick: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({ onClick }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? ReactDOM.createPortal(
    <div
      className='fixed top-0 right-0 w-full h-screen bg-black bg-opacity-75 z-10'
      onClick={onClick}
    ></div>,
    document.getElementById("backdrop-hook")!
  ) : null;
};

export default Backdrop;
