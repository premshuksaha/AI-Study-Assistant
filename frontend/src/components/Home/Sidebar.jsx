import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

import { LuLayoutDashboard, LuWalletMinimal,LuHandCoins} from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { HiLogout } from "react-icons/hi";

export const SideMenuData = [
    {
        id: "01",
        label: "Home",
        icon: LuLayoutDashboard,
        path: "/home",
    },
    {
        id: "02",
        label: "History",
        icon: LuWalletMinimal,
        path: "/history",
    },
    {
        id: "03",
        label: "Buy Credits",
        icon: LuHandCoins,
        path: "/buy-credits",
    },
    {
        id: "06",
        label: "Logout",
        icon: HiLogout,
        path: "/logout",
    },
];

const Sidebar = ({ activeMenu, onMenuClick }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "/logout") {
      handleLogout();
      return;
    }
    navigate(route);
    onMenuClick?.();
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
    onMenuClick?.();
  };

  return (
    <div className="sticky top-19 z-20 h-[calc(100dvh-88px)] w-64 rounded-2xl border border-white/10 bg-zinc-900/70 p-5 backdrop-blur-md">
      <div className="mb-8 flex flex-col items-center justify-center border-b border-white/10 pb-4">
        <h5 className="mt-1 text-base font-semibold leading-6 text-zinc-100">
            {user?.name || ""}
        </h5>
        <p className="text-xs text-zinc-400">Welcome back</p>
        <div className="mt-3 hidden items-center gap-2 rounded-lg bg-violet-500/30 px-3 py-2 lg:flex">
          <FaStar className="text-white" />
          <span className="text-sm font-medium text-white">
            {user?.credits || 0} Credits
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        {SideMenuData.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`mb-2 flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-[15px] transition-colors ${
              activeMenu === item.label
                ? "bg-violet-500 text-white shadow-lg shadow-violet-500/20"
                : "text-zinc-200 hover:bg-white/10"
            }`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-xl" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
