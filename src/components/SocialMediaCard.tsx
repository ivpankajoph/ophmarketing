// src/components/SocialMediaCard.tsx
import { Settings } from 'lucide-react';

interface SocialMediaCardProps {
  platform: string;
  followers: number;
  engagement: number;
  posts: number;
  reach: number;
  color: string;
  icon: React.ElementType;
}

const SocialMediaCard = ({ platform, followers, engagement, posts, reach, color, icon: Icon }: SocialMediaCardProps) => (
  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 ${color} rounded-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <button className="text-gray-400 hover:text-gray-600">
        <Settings className="w-5 h-5" />
      </button>
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-4">{platform}</h3>
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Followers</span>
        <span className="font-semibold text-gray-900">{followers.toLocaleString()}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Engagement</span>
        <span className="font-semibold text-gray-900">{engagement}%</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Posts</span>
        <span className="font-semibold text-gray-900">{posts}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Reach</span>
        <span className="font-semibold text-gray-900">{reach.toLocaleString()}</span>
      </div>
    </div>
    <button className="w-full mt-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors">
      View Details
    </button>
  </div>
);

export default SocialMediaCard;