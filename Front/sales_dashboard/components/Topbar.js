"use client";
import { FiBell } from "react-icons/fi";
import { PiUserCircle, PiBuildings } from "react-icons/pi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { LuTextSearch } from "react-icons/lu";
import { IoSearch, IoMenu } from "react-icons/io5";
import { RiLayoutRightLine } from "react-icons/ri";

export default function TopNavbar() {
  return (
    <div className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 shadow-md">
      {/* Left section */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button className="flex items-center bg-white rounded-full border border-gray-300 px-3 h-10 text-teal-700 hover:shadow-md shadow-sm">
          <PiBuildings size={20} />
          <span className="hidden sm:inline font-medium ml-2 mr-3">New</span>
          <span className="hidden sm:inline ml-2 h-full border-l border-gray-300 bg-gray-300" />
          <MdOutlineKeyboardArrowDown size={24} className="ml-0.5" />
        </button>

        <button className="w-10 h-10 rounded-full bg-white text-teal-700 border border-gray-300 flex items-center justify-center shadow-sm hover:shadow-md">
          <LuTextSearch size={20} className="ml-0.5" />
        </button>
      </div>

      {/* Center section (hidden on small screens) */}
      <div className="hidden md:flex relative w-64 lg:w-96 border border-gray-300 rounded-full bg-white shadow-sm hover:shadow-md">
        <IoSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          size={18}
        />
        <input
          type="text"
          placeholder="Search for anything"
          className="w-full rounded-full bg-white py-2 pl-11 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
        />
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4 sm:space-x-6">
        {/* Notifications */}
        <div className="relative">
          <FiBell size={22} className="text-teal-700 hover:text-gray-600" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
            3
          </span>
        </div>

        {/* Profile */}
        <PiUserCircle size={24} className="text-teal-700 hover:text-gray-600" />

        {/* Help link (hidden on very small screens) */}
        <a
          href="#"
          className="hidden sm:inline text-md text-teal-700 hover:text-gray-600"
        >
          Help
        </a>

        {/* Hamburger menu (visible on mobile) */}
        <IoMenu size={24} className="text-teal-700 hover:text-gray-600 md:hidden" />

        {/* Layout icon (desktop only) */}
        <RiLayoutRightLine
          size={24}
          className="hidden md:inline text-teal-700 ml-6"
        />
      </div>
    </div>
  );
}