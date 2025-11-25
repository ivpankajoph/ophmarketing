// src/pages/AnalyticsPage.tsx
import {

  Users,
  MousePointerClick,
  Eye,
  TrendingUp,

  Smartphone,
  Laptop,
  Tablet,
  Search,
  Calendar,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Bar,
  BarChart,
} from "recharts";

import { useState } from "react";

// Traffic Line Chart (Mock Data)
const trafficData = [
  { date: "Jan 1", visits: 1200, leads: 80 },
  { date: "Jan 2", visits: 1500, leads: 110 },
  { date: "Jan 3", visits: 1700, leads: 150 },
  { date: "Jan 4", visits: 1400, leads: 95 },
  { date: "Jan 5", visits: 2000, leads: 180 },
  { date: "Jan 6", visits: 2200, leads: 210 },
  { date: "Jan 7", visits: 2400, leads: 260 },
];

// Channel Bar Chart
const channelData = [
  { channel: "Facebook", value: 3400 },
  { channel: "Instagram", value: 2900 },
  { channel: "Google", value: 4100 },
  { channel: "LinkedIn", value: 1500 },
  { channel: "Email", value: 900 },
];

// Device Pie Chart
const deviceData = [
  { name: "Mobile", value: 6400 },
  { name: "Desktop", value: 4200 },
  { name: "Tablet", value: 1800 },
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B"];

const AnalyticsPage = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>

        <div className="flex items-center gap-3">
          <div className="flex items-center px-3 py-2 border rounded-lg bg-gray-50">
            <Search size={16} className="text-gray-500" />
            <input
              placeholder="Search..."
              className="bg-transparent px-2 outline-none text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="px-4 py-2 border rounded-lg bg-white text-gray-700 flex items-center gap-2 hover:bg-gray-100">
            <Calendar size={16} />
            Select Date
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 border rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Visitors</p>
            <Eye className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold mt-2">124,800</h2>
          <p className="text-xs text-green-600 mt-1">+12.4% this week</p>
        </div>

        <div className="bg-white p-5 border rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Leads</p>
            <Users className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mt-2">4,280</h2>
          <p className="text-xs text-green-600 mt-1">+9.2% this week</p>
        </div>

        <div className="bg-white p-5 border rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Clicks</p>
            <MousePointerClick className="text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold mt-2">36,510</h2>
          <p className="text-xs text-red-600 mt-1">-4.1% this week</p>
        </div>

        <div className="bg-white p-5 border rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Conversion Rate</p>
            <TrendingUp className="text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold mt-2">3.42%</h2>
          <p className="text-xs text-green-600 mt-1">+1.4% this week</p>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Traffic Chart */}
        <div className="lg:col-span-2 bg-white p-6 border rounded-lg">
          <h2 className="font-semibold text-gray-800 mb-4">
            Website Traffic & Leads
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#3B82F6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="leads"
                stroke="#10B981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Device Chart */}
        <div className="bg-white p-6 border rounded-lg">
          <h2 className="font-semibold text-gray-800 mb-4">Device Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={deviceData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {deviceData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          {/* Device Stats */}
          <div className="mt-4 space-y-2 text-sm">
            <p className="flex items-center gap-2">
              <Smartphone size={16} className="text-blue-600" /> Mobile: 64%
            </p>
            <p className="flex items-center gap-2">
              <Laptop size={16} className="text-green-600" /> Desktop: 27%
            </p>
            <p className="flex items-center gap-2">
              <Tablet size={16} className="text-orange-500" /> Tablet: 9%
            </p>
          </div>
        </div>
      </div>

      {/* Channel Performance */}
      <div className="bg-white p-6 border rounded-lg mb-6">
        <h2 className="font-semibold text-gray-800 mb-4">Channel Performance</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={channelData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="channel" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Traffic Sources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 border rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Organic Search</h3>
          <p className="text-3xl font-bold text-blue-600">42%</p>
        </div>

        <div className="bg-white p-5 border rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Paid Ads</h3>
          <p className="text-3xl font-bold text-green-600">35%</p>
        </div>

        <div className="bg-white p-5 border rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Social Media</h3>
          <p className="text-3xl font-bold text-purple-600">23%</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
