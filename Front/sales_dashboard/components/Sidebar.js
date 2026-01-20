"use client";
import { useState } from "react";
import {
  PiGauge,
  PiBuildingsFill,
  PiUserCircle,
  PiCalendar,
  PiCurrencyCircleDollar,
  PiClipboardText,
  PiTicket,
  PiChatTeardropText,
  PiChartBar,
  PiTarget,
  PiWrench
} from "react-icons/pi";
import { HiAtSymbol } from "react-icons/hi2";
import { TbSquaresDiagonal } from "react-icons/tb";
import { RiArrowRightSLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const icons = [
    PiGauge,
    PiBuildingsFill,
    PiUserCircle,
    PiCalendar,
    PiCurrencyCircleDollar,
    PiClipboardText,
    PiTicket,
    TbSquaresDiagonal,
    HiAtSymbol,
    PiChatTeardropText,
    PiChartBar,
    PiTarget,
    PiWrench
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-teal-800 text-white p-2 rounded-lg"
      >
        <HiOutlineMenu size={22} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-50
          h-screen
          w-16
          bg-teal-800 text-white
          flex flex-col items-center py-4
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="text-4xl font-light mb-6">L</div>

        {/* Icons */}
        <div className="flex flex-col items-center space-y-4 flex-1">
          {icons.map((Icon, index) => (
            <button
              key={index}
              className="
                w-8 h-8
                flex items-center justify-center
                rounded-full
                transition
                hover:bg-teal-300
                hover:text-teal-900
              "
            >
              <Icon size={22} />
            </button>
          ))}
        </div>

        {/* Collapse button */}
        <button
          className="
            w-10 h-10
            flex items-center justify-center
            rounded-full
            hover:bg-teal-700
            transition
            mt-4
          "
        >
          <RiArrowRightSLine size={22} />
        </button>
      </aside>
    </>
  );
}
