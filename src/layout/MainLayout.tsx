import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import AiChatWidget from "../components/AiChatWidget";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar on left */}
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      {/* Page content on right */}
      <div className="flex-1 overflow-y-auto p-6">
        <Outlet />
           <AiChatWidget />
      </div>
    </div>
  );
};

export default MainLayout;
