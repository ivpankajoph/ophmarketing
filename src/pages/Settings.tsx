// src/pages/SettingsPage.tsx

import {
  User,
 
  Bell,
  Globe,
  Shield,
  Lock,
  Save,
  ToggleLeft,
  ToggleRight,
  KeyRound,
  Database,
} from "lucide-react";
import { useState } from "react";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="space-y-10">

        {/* Profile Settings */}
        <section className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            Profile Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                defaultValue="Pankaj"
                className="mt-1 p-2 border rounded-lg w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email Address</label>
              <input
                type="email"
                defaultValue="support@company.com"
                className="mt-1 p-2 border rounded-lg w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Phone Number</label>
              <input
                type="text"
                defaultValue="+91 9876543210"
                className="mt-1 p-2 border rounded-lg w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Country</label>
              <select className="mt-1 p-2 border rounded-lg w-full">
                <option>India</option>
                <option>United States</option>
                <option>UK</option>
              </select>
            </div>
          </div>

          <button className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Save size={16} /> Save Changes
          </button>
        </section>

        {/* Notification Settings */}
        <section className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            Notifications
          </h2>

          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">
                  Get updates for leads, payments, and campaigns.
                </p>
              </div>

              <button
                onClick={() => setNotifications(!notifications)}
                className="p-2"
              >
                {notifications ? (
                  <ToggleRight className="w-10 h-10 text-blue-600" />
                ) : (
                  <ToggleLeft className="w-10 h-10 text-gray-400" />
                )}
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Enable Dark Mode</p>
                <p className="text-sm text-gray-500">
                  Switch the dashboard to dark theme.
                </p>
              </div>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2"
              >
                {darkMode ? (
                  <ToggleRight className="w-10 h-10 text-blue-600" />
                ) : (
                  <ToggleLeft className="w-10 h-10 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Privacy Settings */}
        <section className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Privacy & Security
          </h2>

          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm text-gray-500">Current Password</label>
              <input
                type="password"
                className="mt-1 p-2 border rounded-lg w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">New Password</label>
              <input
                type="password"
                className="mt-1 p-2 border rounded-lg w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Confirm Password</label>
              <input
                type="password"
                className="mt-1 p-2 border rounded-lg w-full"
              />
            </div>

            <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
              <Lock size={16} /> Update Password
            </button>
          </div>
        </section>

        {/* API & Integrations */}
        <section className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-blue-600" />
            API & Integrations
          </h2>

          <div className="space-y-5">
            <div>
              <label className="text-sm text-gray-600">Meta Access Token</label>
              <input
                type="text"
                placeholder="Enter your Facebook/WhatsApp Access Token"
                className="mt-1 p-2 border rounded-lg w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Webhook URL</label>
              <input
                type="text"
                placeholder="https://yourdomain.com/webhook"
                className="mt-1 p-2 border rounded-lg w-full"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Database Connection</label>
              <div className="flex items-center gap-3 mt-1">
                <Database className="text-gray-500" />
                <p className="text-gray-600 text-sm">MongoDB Connected</p>
              </div>
            </div>

            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Save size={16} /> Save Integrations
            </button>
          </div>
        </section>

        {/* Language */}
        <section className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            Language
          </h2>

          <select className="p-3 border rounded-lg w-full text-gray-700">
            <option>English (Default)</option>
            <option>Hindi</option>
            <option>Spanish</option>
          </select>
        </section>

      </div>
    </div>
  );
};

export default SettingsPage;
