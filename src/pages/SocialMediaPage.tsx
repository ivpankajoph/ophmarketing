// src/pages/SocialMediaPage.tsx
import { useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Plus,
  Image,
  Video,

  Calendar,
  Search,
  MoreVertical,
  Globe,
} from "lucide-react";

const platforms = [
  { id: "facebook", name: "Facebook", icon: Facebook, connected: true },
  { id: "instagram", name: "Instagram", icon: Instagram, connected: true },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, connected: false },
  { id: "twitter", name: "Twitter (X)", icon: Twitter, connected: false },
  { id: "youtube", name: "YouTube", icon: Youtube, connected: false },
];

const mockPosts = [
  {
    id: "1",
    platform: "Facebook",
    content: "Launching our new Diwali Sale offer! 🪔🔥",
    type: "Image",
    date: "2025-01-23",
    reach: 12500,
    engagement: 950,
    status: "Posted",
  },
  {
    id: "2",
    platform: "Instagram",
    content: "Behind the scenes from our team photoshoot 📸✨",
    type: "Video",
    date: "2025-01-22",
    reach: 18900,
    engagement: 1400,
    status: "Scheduled",
  },
  {
    id: "3",
    platform: "Facebook",
    content: "Customer testimonial — Thank you for the love ❤️",
    type: "Image",
    date: "2025-01-20",
    reach: 7800,
    engagement: 560,
    status: "Posted",
  },
];

const SocialMediaPage = () => {
  const [posts] = useState(mockPosts);
  const [search, setSearch] = useState("");
  const [filterPlatform, setFilterPlatform] = useState("ALL");

  const filteredPosts = posts.filter((post) => {
    const matchesText = post.content
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesPlatform =
      filterPlatform === "ALL" || post.platform === filterPlatform;
    return matchesText && matchesPlatform;
  });

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Social Media</h1>
        <div className="flex items-center gap-3">
          <button className="bg-gray-100 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 text-gray-700">
            <Calendar size={18} />
            Calendar View
          </button>
          <button className="bg-blue-600 px-4 py-2 rounded-lg text-white flex items-center gap-2 hover:bg-blue-700">
            <Plus size={18} />
            New Post
          </button>
        </div>
      </div>

      {/* Social Accounts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {platforms.map((p) => (
          <div
            key={p.id}
            className="bg-white p-4 border rounded-lg flex flex-col items-center justify-center text-center"
          >
            <p.icon
              className={`w-8 h-8 ${
                p.connected ? "text-blue-600" : "text-gray-400"
              }`}
            />
            <h3 className="font-medium mt-3 text-gray-800">{p.name}</h3>

            {p.connected ? (
              <span className="mt-2 text-xs px-2 py-1 rounded bg-green-100 text-green-700">
                Connected
              </span>
            ) : (
              <button className="mt-2 text-xs px-2 py-1 rounded bg-blue-600 text-white">
                Connect
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 border rounded-lg">
          <p className="text-sm text-gray-500">Posts</p>
          <h2 className="text-2xl font-bold mt-1">128</h2>
        </div>

        <div className="bg-white p-5 border rounded-lg">
          <p className="text-sm text-gray-500">Engagement</p>
          <h2 className="text-2xl font-bold mt-1">27.4K</h2>
        </div>

        <div className="bg-white p-5 border rounded-lg">
          <p className="text-sm text-gray-500">Followers</p>
          <h2 className="text-2xl font-bold mt-1">182.9K</h2>
        </div>

        <div className="bg-white p-5 border rounded-lg">
          <p className="text-sm text-gray-500">Reach</p>
          <h2 className="text-2xl font-bold mt-1">652K</h2>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border p-4 rounded-lg mb-6">
        <div className="grid md:grid-cols-3 gap-4">

          <div className="flex items-center px-3 py-2 border rounded-lg bg-gray-50">
            <Search size={16} className="text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="bg-transparent px-2 outline-none flex-1 text-sm"
            />
          </div>

          <select
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm bg-white"
          >
            <option value="ALL">All Platforms</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Twitter">Twitter</option>
            <option value="YouTube">YouTube</option>
          </select>

          <input type="date" className="px-3 py-2 border rounded-lg text-sm" />
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-gray-600 text-sm">
              <th className="p-4">Content</th>
              <th className="p-4">Platform</th>
              <th className="p-4">Reach</th>
              <th className="p-4">Engagement</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredPosts.map((post) => {
              const Icon =
                platforms.find((p) => p.name === post.platform)?.icon ||
                Globe;

              return (
                <tr key={post.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <p className="font-medium">{post.content}</p>
                    <p className="text-xs text-gray-500">Date: {post.date}</p>
                  </td>

                  <td className="p-4 flex items-center gap-2">
                    <Icon size={16} className="text-gray-700" />
                    {post.platform}
                  </td>

                  <td className="p-4">{post.reach.toLocaleString()}</td>
                  <td className="p-4">{post.engagement.toLocaleString()}</td>

                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        post.status === "Posted"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredPosts.length === 0 && (
          <div className="p-10 text-center text-gray-600">
            No posts found.
          </div>
        )}
      </div>

      {/* New Post Panel (Simple Placeholder) */}
      <div className="mt-8 bg-white border rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Create New Post</h2>

        <textarea
          placeholder="Write your post content..."
          className="w-full border rounded-lg p-3 text-sm h-24 mb-4"
        ></textarea>

        <div className="flex items-center gap-3 mb-4">
          <button className="p-3 border rounded-lg hover:bg-gray-100">
            <Image size={18} />
          </button>
          <button className="p-3 border rounded-lg hover:bg-gray-100">
            <Video size={18} />
          </button>
        </div>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
          Publish Post
        </button>
      </div>
    </div>
  );
};

export default SocialMediaPage;
