import React, { useState} from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import Sidebar from './Sidebar';

const APP_NAME = "AI Study Assistant";


const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="sticky top-0 z-10 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-4 py-3">
        
        <button
          className="block rounded-lg p-1 text-zinc-100 hover:bg-white/10 lg:hidden"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <img src="/favicon.svg" alt="AI Study Assistant" className="h-8 w-8" />

        <div className="leading-tight">
          <div className="text-sm font-semibold text-zinc-100">{APP_NAME}</div>
          <div className="text-xs text-zinc-400">Notes. Graphs. PDFs.</div>
        </div>

        <div className="ml-auto hidden text-xs text-zinc-400 sm:block md:text-sm">
          Focused · Fast · Organized
        </div>
      </div>

      {openSideMenu && (
        <>
          <button
            type="button"
            aria-label="Close sidebar overlay"
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setOpenSideMenu(false)}
          />
          <div className="fixed left-0 top-15.25 z-40 h-[calc(100dvh-61px)] w-72 bg-zinc-950/95 p-3 backdrop-blur-md lg:hidden">
            <Sidebar activeMenu={activeMenu} onMenuClick={() => setOpenSideMenu(false)} />
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;