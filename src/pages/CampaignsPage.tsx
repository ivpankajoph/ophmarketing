// src/pages/CampaignsPage.tsx
import { useState } from "react";
import {
  Plus,
  Search,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MessageSquare,
  Globe,
  MoreVertical,
  Pause,
  Play,
  Copy,
  Pencil,
  Trash2,
} from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  channel: string;
  status: "ACTIVE" | "PAUSED" | "DRAFT";
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  leads: number;
  createdAt: string;
}

// Mock Data
const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Diwali Sale – Lead Form",
    channel: "Facebook",
    status: "ACTIVE",
    budget: 50000,
    spent: 12000,
    impressions: 200000,
    clicks: 2100,
    leads: 320,
    createdAt: "2025-01-02",
  },
  {
    id: "2",
    name: "New Year Promo – Insta",
    channel: "Instagram",
    status: "PAUSED",
    budget: 35000,
    spent: 8000,
    impressions: 95000,
    clicks: 900,
    leads: 110,
    createdAt: "2025-01-10",
  },
  {
    id: "3",
    name: "Google Search – Branding",
    channel: "Google",
    status: "DRAFT",
    budget: 60000,
    spent: 0,
    impressions: 0,
    clicks: 0,
    leads: 0,
    createdAt: "2025-01-12",
  },
];

const channelIcons: any = {
  Facebook: Facebook,
  Instagram: Instagram,
  Google: Globe,
  LinkedIn: Linkedin,
  Email: Mail,
  SMS: MessageSquare,
};

const CampaignsPage = () => {
  const [campaigns] = useState(mockCampaigns);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterChannel, setFilterChannel] = useState("ALL");

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "ALL" || c.status === filterStatus;
    const matchesChannel =
      filterChannel === "ALL" || c.channel === filterChannel;
    return matchesSearch && matchesStatus && matchesChannel;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus size={18} />
          Create Campaign
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="grid md:grid-cols-4 gap-4">

          {/* Search */}
          <div className="flex items-center px-3 py-2 border rounded-lg bg-gray-50">
            <Search size={16} className="text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search campaigns..."
              className="bg-transparent px-2 outline-none flex-1 text-sm"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white text-sm"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="PAUSED">Paused</option>
            <option value="DRAFT">Draft</option>
          </select>

          {/* Channel Filter */}
          <select
            value={filterChannel}
            onChange={(e) => setFilterChannel(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white text-sm"
          >
            <option value="ALL">All Channels</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="Google">Google</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Email">Email</option>
            <option value="SMS">SMS</option>
          </select>

          {/* Date Range */}
          <input
            type="date"
            className="px-3 py-2 border rounded-lg text-sm"
          />
        </div>
      </div>

      {/* Campaign List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-gray-600 text-sm">
              <th className="p-4">Campaign</th>
              <th className="p-4">Status</th>
              <th className="p-4">Channel</th>
              <th className="p-4">Impr.</th>
              <th className="p-4">Clicks</th>
              <th className="p-4">Leads</th>
              <th className="p-4">Budget</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCampaigns.map((c) => {
              const ChannelIcon = channelIcons[c.channel];
              return (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs text-gray-500">
                      Created: {c.createdAt}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        c.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : c.status === "PAUSED"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  {/* Channel */}
                  <td className="p-4 flex items-center gap-2">
                    <ChannelIcon size={16} className="text-gray-700" />
                    {c.channel}
                  </td>

                  <td className="p-4">{c.impressions.toLocaleString()}</td>
                  <td className="p-4">{c.clicks.toLocaleString()}</td>
                  <td className="p-4">{c.leads.toLocaleString()}</td>
                  <td className="p-4">${c.budget.toLocaleString()}</td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="relative inline-block text-left">
                      <button className="p-2 hover:bg-gray-200 rounded-lg">
                        <MoreVertical size={18} />
                      </button>

                      {/* Dropdown */}
                      <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-36 z-50 hidden group-hover:block">
                        <button className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100">
                          <Pencil size={14} /> Edit
                        </button>
                        <button className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100">
                          <Copy size={14} /> Duplicate
                        </button>
                        <button className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100">
                          {c.status === "ACTIVE" ? (
                            <>
                              <Pause size={14} /> Pause
                            </>
                          ) : (
                            <>
                              <Play size={14} /> Resume
                            </>
                          )}
                        </button>
                        <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredCampaigns.length === 0 && (
          <div className="p-10 text-center text-gray-600">
            No campaigns found.
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignsPage;
