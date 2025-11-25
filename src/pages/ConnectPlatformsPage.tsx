// src/pages/ConnectPlatformsPage.tsx

import {
  Facebook,
  MessageCircle,
  Link as LinkIcon,
  CheckCircle,
  Loader2,
  ShieldCheck,
  KeyRound,
} from "lucide-react";
import { useState } from "react";

const ConnectPlatformsPage = () => {
  const [fbConnected, setFbConnected] = useState(false);
  const [waConnected, setWaConnected] = useState(false);

  const [loadingFB, setLoadingFB] = useState(false);
  const [loadingWA, setLoadingWA] = useState(false);

  // Simulated Connect Functions
  const handleConnectFacebook = () => {
    setLoadingFB(true);
    setTimeout(() => {
      setFbConnected(true);
      setLoadingFB(false);
    }, 1500);
  };

  const handleConnectWhatsApp = () => {
    setLoadingWA(true);
    setTimeout(() => {
      setWaConnected(true);
      setLoadingWA(false);
    }, 1500);
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Connect Platforms
      </h1>

      {/* Description */}
      <p className="text-gray-600 mb-8 max-w-2xl">
        Connect your Facebook Page and WhatsApp Business to manage leads, send
        messages, sync campaigns and automate your marketing workflows.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Facebook Card */}
        <div className="bg-white p-6 border rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Facebook className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Facebook Page
              </h2>
              <p className="text-sm text-gray-500">
                Connect your Facebook Page to sync lead forms & campaigns.
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              Secure OAuth Login
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <KeyRound className="w-4 h-4 text-gray-700" />
              Permission-based Access
            </div>
          </div>

          {!fbConnected ? (
            <button
              onClick={handleConnectFacebook}
              disabled={loadingFB}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
            >
              {loadingFB ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <LinkIcon className="w-5 h-5" /> Connect Facebook Page
                </>
              )}
            </button>
          ) : (
            <div className="w-full py-3 px-4 bg-green-100 text-green-700 flex items-center justify-between rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Facebook Page Connected
              </div>
              <span className="text-sm font-semibold">✓</span>
            </div>
          )}
        </div>

        {/* WhatsApp Card */}
        <div className="bg-white p-6 border rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-8 h-8 text-green-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                WhatsApp Business
              </h2>
              <p className="text-sm text-gray-500">
                Connect your WhatsApp Business Cloud API for messaging.
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              Facebook Business Verification Required
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <KeyRound className="w-4 h-4 text-gray-700" />
              Phone Number Registration Needed
            </div>
          </div>

          {!waConnected ? (
            <button
              onClick={handleConnectWhatsApp}
              disabled={loadingWA}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition"
            >
              {loadingWA ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <LinkIcon className="w-5 h-5" /> Connect WhatsApp
                </>
              )}
            </button>
          ) : (
            <div className="w-full py-3 px-4 bg-green-100 text-green-700 flex items-center justify-between rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                WhatsApp Connected
              </div>
              <span className="text-sm font-semibold">✓</span>
            </div>
          )}
        </div>
      </div>

      {/* Steps Section */}
      <div className="mt-10 bg-white p-6 border rounded-xl shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Connection Steps
        </h2>

        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex gap-3 items-start">
            <span className="font-bold text-blue-600">1.</span>
            Login with Facebook securely using OAuth.
          </div>

          <div className="flex gap-3 items-start">
            <span className="font-bold text-blue-600">2.</span>
            Grant permissions for pages, lead forms, ads & WhatsApp.
          </div>

          <div className="flex gap-3 items-start">
            <span className="font-bold text-blue-600">3.</span>
            Choose the Facebook Page to sync with your dashboard.
          </div>

          <div className="flex gap-3 items-start">
            <span className="font-bold text-green-600">4.</span>
            For WhatsApp, register a phone number in WhatsApp Cloud API.
          </div>

          <div className="flex gap-3 items-start">
            <span className="font-bold text-green-600">5.</span>
            Once connected, you can send messages and receive leads.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectPlatformsPage;
