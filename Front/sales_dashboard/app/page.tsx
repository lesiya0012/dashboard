"use client";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Tabs from "../components/Tabs";

export default function Home() {
  return (
    <div className="flex h-screen">
      {/* Sidebar hidden on mobile, visible on md+ */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <div className="h-[60px] border-b bg-gray-200">
          <Topbar />
        </div>

        {/* CRM layout */}
        <Tabs />
      </div>
    </div>
  );
}