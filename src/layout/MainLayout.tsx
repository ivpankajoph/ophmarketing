import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import AiChatWidget from "../components/AiChatWidget";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");

  const location = useLocation(); // 👈 Get current route

  const hideAIChat = location.pathname === "/chatbot"; // 👈 Check route

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      {/* Page Content */}
      <div className="flex-1 overflow-y-auto p-6 relative">
        <Outlet />

        {/* Hide AI Chat widget on /chatbot */}
        {!hideAIChat && <AiChatWidget />}
      </div>
    </div>
  );
};

export default MainLayout;
