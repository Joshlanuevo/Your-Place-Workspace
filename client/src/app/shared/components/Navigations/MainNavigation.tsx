"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineClose } from "react-icons/ai"

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';

const MainNavigation = (props: any) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  }

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  }

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <div className="close-icon p-4 absolute top-0 right-0">
          <AiOutlineClose size={30} />
        </div>
        <nav className="h-full z-5 p-20 flex flex-col items-start">
          <NavLinks />
        </nav>
      </SideDrawer>
      
      <MainHeader>
        <h1 className="text-white bg-[#5865F2] py-2 px-4 rounded-lg text-xl sm:text-lg font-bold">
          <Link href="/">YourPlace</Link>
        </h1>
        <nav className="hidden sm:block">
          <NavLinks />
        </nav>
        <button 
          className="w-12 h-12 bg-transparent border-none flex flex-col 
          justify-between ml-8 cursor-pointer sm:hidden" 
          onClick={openDrawerHandler}
        >
          <span className='block w-12 h-2.5 bg-gray-500' />
          <span className='block w-12 h-2.5 bg-gray-500' />
          <span className='block w-12 h-2.5 bg-gray-500' />
        </button>
      </MainHeader>
    </>
  )
}

export default MainNavigation;