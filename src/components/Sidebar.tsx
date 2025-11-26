// src/components/Sidebar.tsx
import {
  TrendingUp,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  BarChart3,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Facebook,
  FlameIcon,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

interface SidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  activeNav: string;
  setActiveNav: (id: string) => void;
}

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "campaigns", label: "Campaigns", icon: Megaphone },
  { id: "social", label: "Social Media", icon: MessageSquare },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "Chatbot", label: "Custom Chatbot", icon: FlameIcon },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "facebookPages", label: "Facebook Pages", icon: Facebook },
  { id: "settings", label: "Settings", icon: Settings },
];

// ⭐ Route Mapping
const routes: Record<string, string> = {
  dashboard: "/",
  campaigns: "/campaigns",
  social: "/social",
  analytics: "/analytics",
  Chatbot: "/chatbot",
  reports: "/reports",
  facebookPages: "/facebook-pages",
  audience: "/audience",
  settings: "/settings",
};

const Sidebar = ({
  sidebarCollapsed,
  setSidebarCollapsed,
  activeNav,
  setActiveNav,
}: SidebarProps) => {
  const navigate = useNavigate();

  const handleNavigation = (id: string) => {
    setActiveNav(id);
    navigate(routes[id]); // ⭐ redirects to route
  };

  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${
        sidebarCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">MarketPro</h2>
              <p className="text-xs text-gray-500">Marketing Suite</p>
            </div>
          </div>
        )}

        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeNav === item.id
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!sidebarCollapsed && <span>{item.label}</span>}
              {activeNav === item.id && !sidebarCollapsed && (
                <div className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {!sidebarCollapsed && (
          <>
            <div className="my-6 border-t border-gray-200"></div>
          </>
        )}
      </nav>

      {/* Footer User */}
      <div className="p-4 border-t border-gray-200">
        {!sidebarCollapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm truncate">
                Pankaj
              </p>
              <p className="text-xs text-gray-500 truncate">john@company.com</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <LogOut className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        ) : (
          <button className="w-full p-2 hover:bg-gray-100 rounded-lg transition-colors flex justify-center">
            <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
              JD
            </div>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
