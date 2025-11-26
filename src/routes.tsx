import { createBrowserRouter } from "react-router-dom";
import LeadFormsPage from "./pages/LeadFormsPage";
import MainLayout from "./layout/MainLayout";
import LeadsPage from "./pages/LeadsPage";
import CampaignsPage from "./pages/CampaignsPage";
import SocialMediaPage from "./pages/SocialMediaPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ReportsPage from "./pages/ReportsPage";
import ConnectPlatformsPage from "./pages/ConnectPlatformsPage";
import SettingsPage from "./pages/Settings";
import ChatbotPage from "./pages/Chatbot";

// ... other pages

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/leads/:formId", element: <LeadsPage /> },
      { path: "", element: <LeadFormsPage /> },
      { path: "/campaigns", element: <CampaignsPage /> },
      { path: "/social", element: <SocialMediaPage /> },
      { path: "/analytics", element: <AnalyticsPage /> },
      { path: "/chatbot", element: <ChatbotPage /> },
      { path: "/reports", element: <ReportsPage /> },
      { path: "/facebook-pages", element: <ConnectPlatformsPage /> },
      { path: "/settings", element: <SettingsPage /> },
      // add more pages here
    ],
  },
]);

export default router;
