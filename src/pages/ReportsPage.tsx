// src/pages/ReportsPage.tsx
import { useState } from "react";
import {

  Download,
  Search,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  MousePointerClick,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Mock Data
const reportData = [
  { date: "Jan 1", leads: 120, revenue: 2300, clicks: 1500 },
  { date: "Jan 2", leads: 140, revenue: 3100, clicks: 1700 },
  { date: "Jan 3", leads: 180, revenue: 3800, clicks: 2100 },
  { date: "Jan 4", leads: 110, revenue: 2000, clicks: 1300 },
  { date: "Jan 5", leads: 260, revenue: 4800, clicks: 2500 },
  { date: "Jan 6", leads: 300, revenue: 5200, clicks: 2700 },
  { date: "Jan 7", leads: 350, revenue: 6400, clicks: 3250 },
];

const tableReports = [
  {
    id: "1",
    source: "Facebook Ads",
    leads: 320,
    revenue: 12500,
    cpc: 4.2,
    ctr: "3.4%",
  },
  {
    id: "2",
    source: "Instagram Ads",
    leads: 190,
    revenue: 8200,
    cpc: 3.8,
    ctr: "2.9%",
  },
  {
    id: "3",
    source: "Google Ads",
    leads: 540,
    revenue: 18400,
    cpc: 5.1,
    ctr: "5.1%",
  },
];

const ReportsPage = () => {
  const [search, setSearch] = useState("");
  const [reportType, setReportType] = useState("ALL");

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>

        <div className="flex items-center gap-3">
          <button className="bg-gray-100 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border p-4 rounded-lg mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="flex items-center px-3 py-2 border rounded-lg bg-gray-50">
            <Search size={16} className="text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reports..."
              className="bg-transparent px-2 outline-none flex-1 text-sm"
            />
          </div>

          {/* Report Type */}
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm bg-white"
          >
            <option value="ALL">All Reports</option>
            <option value="LEADS">Lead Reports</option>
            <option value="REVENUE">Revenue Reports</option>
            <option value="ADS">Ads Performance</option>
          </select>

          {/* Date Range */}
          <button className="px-3 py-2 border rounded-lg bg-white flex items-center gap-2">
            <Calendar size={16} /> Date Range
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 border rounded-lg">
          <p className="text-sm text-gray-500">Total Leads</p>
          <h2 className="text-2xl font-bold mt-1">3,820</h2>
          <Users className="text-blue-600 mt-2" />
        </div>

        <div className="bg-white p-5 border rounded-lg">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h2 className="text-2xl font-bold mt-1">$58,400</h2>
          <DollarSign className="text-green-600 mt-2" />
        </div>

        <div className="bg-white p-5 border rounded-lg">
          <p className="text-sm text-gray-500">Total Clicks</p>
          <h2 className="text-2xl font-bold mt-1">12,340</h2>
          <MousePointerClick className="text-orange-500 mt-2" />
        </div>

        <div className="bg-white p-5 border rounded-lg">
          <p className="text-sm text-gray-500">Overall Growth</p>
          <h2 className="text-2xl font-bold mt-1">18.3%</h2>
          <TrendingUp className="text-purple-600 mt-2" />
        </div>
      </div>

      {/* Line Chart: Leads + Revenue */}
      <div className="bg-white border rounded-lg p-6 mb-6">
        <h2 className="font-semibold text-gray-800 mb-4">Performance Overview</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={reportData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="leads"
              stroke="#3B82F6"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#10B981"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="#F59E0B"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Table Section */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-gray-600 text-sm">
              <th className="p-4">Source</th>
              <th className="p-4">Leads</th>
              <th className="p-4">Revenue</th>
              <th className="p-4">CPC</th>
              <th className="p-4">CTR</th>
              <th className="p-4 text-right">Download</th>
            </tr>
          </thead>

          <tbody>
            {tableReports.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{r.source}</td>
                <td className="p-4">{r.leads}</td>
                <td className="p-4">${r.revenue.toLocaleString()}</td>
                <td className="p-4">${r.cpc}</td>
                <td className="p-4">{r.ctr}</td>

                <td className="p-4 text-right">
                  <button className="p-2 hover:bg-gray-200 rounded-lg">
                    <Download size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {tableReports.length === 0 && (
          <div className="p-10 text-center text-gray-600">
            No reports available.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
