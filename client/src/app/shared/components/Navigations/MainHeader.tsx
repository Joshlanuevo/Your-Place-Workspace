import React, { ReactNode } from 'react';

interface MainHeaderProps {
  children: ReactNode;
}

const MainHeader: React.FC<MainHeaderProps> = (props) => {
  return (
    <div
      className="w-full h-16 fixed top-0 left-0 bg-[#36393F] shadow-md 
       px-6 flex items-center justify-between z-10"
    >
      {props.children}
    </div>
  );
};

export default MainHeader;