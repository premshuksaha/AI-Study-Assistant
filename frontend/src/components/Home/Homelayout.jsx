import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Background from '../Background';
import Loader from '../Loader';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Homelayout = ({ activeMenu, children, isLoading = false }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="relative h-dvh overflow-hidden bg-zinc-950 text-zinc-100">
      <Background />

      <Navbar activeMenu={activeMenu} />

      {isLoading ? (
        <div className="relative z-10 flex min-h-dvh items-center justify-center px-4">
          <Loader centered text="Loading..." />
        </div>
      ) : (
        <>

          {user && (
            <div className="relative mx-auto flex h-[calc(100dvh-61px)] w-full max-w-7xl gap-5 px-2 pb-4 pt-4 md:px-2">
              <div className="hidden lg:block">
                <Sidebar activeMenu={activeMenu} />
              </div>
              <div className="h-full min-h-0 flex-1 overflow-y-auto rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm md:p-6">
                {children}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Homelayout;
