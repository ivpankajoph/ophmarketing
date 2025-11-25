// src/pages/MarketingDashboard.tsx
import { useState } from "react";
import {
  Users,
  DollarSign,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Target,
  Activity,
  Search,
  Filter,
  Download,
  RefreshCw,
  Plus,
  Bell,
} from "lucide-react";

// Components
import StatCard from "../components/StatCard";
import SocialMediaCard from "../components/SocialMediaCard";
import Sidebar from "../components/Sidebar";

const MarketingDashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");

  const [dashboardData] = useState({
    overview: {
      totalRevenue: 124500,
      revenueChange: 12.5,
      totalLeads: 3420,
      leadsChange: 8.3,
      conversionRate: 3.2,
      conversionChange: -1.2,
      activeUsers: 45678,
      usersChange: 15.7,
    },
    socialMedia: [
      {
        platform: "Facebook",
        followers: 45200,
        engagement: 4.8,
        posts: 24,
        reach: 125000,
        color: "bg-blue-500",
        icon: Facebook,
      },
      {
        platform: "Instagram",
        followers: 67800,
        engagement: 6.2,
        posts: 42,
        reach: 185000,
        color: "bg-pink-500",
        icon: Instagram,
      },
      {
        platform: "Twitter",
        followers: 32100,
        engagement: 3.5,
        posts: 56,
        reach: 98000,
        color: "bg-sky-400",
        icon: Twitter,
      },
      {
        platform: "LinkedIn",
        followers: 28900,
        engagement: 5.1,
        posts: 18,
        reach: 75000,
        color: "bg-blue-700",
        icon: Linkedin,
      },
      {
        platform: "YouTube",
        followers: 15600,
        engagement: 7.3,
        posts: 8,
        reach: 156000,
        color: "bg-red-600",
        icon: Youtube,
      },
    ],
    campaigns: [
      {
        name: "Summer Sale 2024",
        status: "active",
        budget: 15000,
        spent: 8200,
        clicks: 12450,
        conversions: 234,
        roi: 245,
      },
      {
        name: "Product Launch",
        status: "active",
        budget: 25000,
        spent: 18900,
        clicks: 28900,
        conversions: 456,
        roi: 312,
      },
      {
        name: "Brand Awareness",
        status: "paused",
        budget: 10000,
        spent: 6500,
        clicks: 15600,
        conversions: 189,
        roi: 198,
      },
      {
        name: "Holiday Special",
        status: "scheduled",
        budget: 20000,
        spent: 0,
        clicks: 0,
        conversions: 0,
        roi: 0,
      },
    ],
    traffic: [
      {
        source: "Organic Search",
        visitors: 15678,
        percentage: 35,
        change: 12.3,
      },
      { source: "Social Media", visitors: 12456, percentage: 28, change: 8.7 },
      { source: "Direct", visitors: 8934, percentage: 20, change: -3.2 },
      { source: "Paid Ads", visitors: 5234, percentage: 12, change: 15.6 },
      { source: "Referral", visitors: 2198, percentage: 5, change: 5.4 },
    ],
    recentActivity: [
      {
        action: "New campaign created",
        platform: "Facebook",
        time: "5 minutes ago",
      },
      {
        action: "Post published",
        platform: "Instagram",
        time: "23 minutes ago",
      },
      {
        action: "Analytics report generated",
        platform: "All Platforms",
        time: "1 hour ago",
      },
      {
        action: "Budget alert triggered",
        platform: "Google Ads",
        time: "2 hours ago",
      },
    ],
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Marketing Dashboard
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Monitor and manage your marketing campaigns
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                  />
                </div>
                <button
                  onClick={handleRefresh}
                  className={`p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Campaign
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="px-6 py-6">
          <div className="flex items-center gap-3 mb-6">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Platforms</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter</option>
              <option value="linkedin">LinkedIn</option>
              <option value="youtube">YouTube</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 ml-auto">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              title="Total Revenue"
              value={dashboardData.overview.totalRevenue}
              change={dashboardData.overview.revenueChange}
              icon={DollarSign}
              format="currency"
            />
            <StatCard
              title="Total Leads"
              value={dashboardData.overview.totalLeads}
              change={dashboardData.overview.leadsChange}
              icon={Users}
            />
            <StatCard
              title="Conversion Rate"
              value={dashboardData.overview.conversionRate}
              change={dashboardData.overview.conversionChange}
              icon={Target}
              format="percentage"
            />
            <StatCard
              title="Active Users"
              value={dashboardData.overview.activeUsers}
              change={dashboardData.overview.usersChange}
              icon={Activity}
            />
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Social Media Performance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {dashboardData.socialMedia.map((platform) => (
                <SocialMediaCard key={platform.platform} {...platform} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Active Campaigns
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {dashboardData.campaigns.map((campaign, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-gray-900">
                            {campaign.name}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              campaign.status === "active"
                                ? "bg-green-100 text-green-700"
                                : campaign.status === "paused"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {campaign.status}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-blue-600">
                          {campaign.roi}% ROI
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Budget</p>
                          <p className="font-semibold text-gray-900">
                            ${campaign.budget.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Spent</p>
                          <p className="font-semibold text-gray-900">
                            ${campaign.spent.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Clicks</p>
                          <p className="font-semibold text-gray-900">
                            {campaign.clicks.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">
                            Conversions
                          </p>
                          <p className="font-semibold text-gray-900">
                            {campaign.conversions}
                          </p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{
                            width: `${
                              (campaign.spent / campaign.budget) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Traffic Sources
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {dashboardData.traffic.map((source, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {source.source}
                        </span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-semibold ${
                              source.change >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {source.change >= 0 ? "+" : ""}
                            {source.change}%
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            {source.visitors.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-linear-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      Total Visitors
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      {dashboardData.traffic
                        .reduce((sum, s) => sum + s.visitors, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Recent Activity
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {dashboardData.recentActivity.map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Activity className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-600">
                        {activity.platform}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingDashboard;
