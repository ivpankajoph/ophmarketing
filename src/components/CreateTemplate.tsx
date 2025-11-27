import { useState } from "react";

export default function WhatsAppTemplateBuilder() {
  // Form state
  const [category,] = useState("MARKETING");
  const [templateName, setTemplateName] = useState("");
  const [language, setLanguage] = useState("en_US");
  const [headerFormat, setHeaderFormat] = useState("TEXT");
  const [headerText, setHeaderText] = useState("");
  const [bodyText, setBodyText] = useState(
    `Hi {{name}} 👋,\n\nThank you for showing your interest in the prestigious Top Life Changer Awards 🏆—a national platform dedicated to recognizing exceptional achievers 🌟, inspiring leaders 💼, and impactful changemakers 🌍 from across the nation.\n\nThis is an exclusive, premium paid event 💎, designed to highlight your achievements on a national stage 🎤.\n\nBenefits of Top Life Changers Awards:\n\n🌟 National Recognition\n🏅 Award Received by Celebrity\n💼 Brand Credibility\n📰 Media Exposure\n🤝 Networking Opportunities\n👀 Increased Visibility\n💡 Inspire Your Industry & Followers\n👥 Employee Motivation\n📈 Business Growth\n🏁 Competitive Advantage\n✅ Professional Validation\n📣 Marketing Leverage\n🌟 Enhanced Reputation\n🎟️ Exclusive Event Access\n⏱️ 2–3 Minute Interview\n🔮 Future Opportunities\n🌐 Brand / Influencer Website Creation\n📸 Photos with Celebrity and Industry Leaders\n\nIf you are really interested to be part of this premium event ✨, then please reply to us back 📩.\n\nReply STOP to unsubscribe.`
  );
  const [buttons, setButtons] = useState([
    { type: "QUICK_REPLY", text: "Yes, I am Interested" },
    { type: "QUICK_REPLY", text: "Not Interested" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [apiResponse, setApiResponse] = useState<Record<string, any> | null>(
    null
  );

  // Update button
  const updateButton = (index: number, field: string, value: string) => {
    const newButtons = [...buttons];
    (newButtons[index] as Record<string, string>)[field] = value;
    setButtons(newButtons);
  };

  // Add button
  const addButton = () => {
    if (buttons.length >= 3) {
      alert("Maximum 3 buttons allowed.");
      return;
    }
    setButtons([...buttons, { type: "QUICK_REPLY", text: "New Button" }]);
  };

  // Remove button
  const removeButton = (index: any) => {
    setButtons(buttons.filter((_, i) => i !== index));
  };

  // Simulate API call
  const handleSubmit = async () => {
    if (!templateName.trim()) {
      alert("Template name is required.");
      return;
    }
    if (!bodyText.trim()) {
      alert("Body text is required.");
      return;
    }

    const payload: {
      name: string;
      category: string;
      language: string;
      components: Array<Record<string, any>>;
    } = {
      name: templateName,
      category,
      language,
      components: [],
    };

    if (headerText.trim()) {
      payload.components.push({
        type: "HEADER",
        format: headerFormat,
        text: headerText,
      });
    }

    payload.components.push({
      type: "BODY",
      text: bodyText,
    });

    if (buttons.length > 0) {
      payload.components.push({
        type: "BUTTONS",
        buttons: buttons.map((btn) => ({
          type: btn.type,
          text: btn.text,
        })),
      });
    }

    // Simulate real API call (replace with fetch in production)
    try {
      const response = await fetch(
        "https://graph.facebook.com/v19.0/3646219455517188/message_templates",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer EAAO1YPeIbdABQLWnxKjcrFUDDiAgK23ZANTwxB2RKYxOUFlFpz31d0i0eVq3gk5ZBSCBs3jYgTZABd5bZBx0gwZCitx34AEZCiKPb8ZBQRYTetwp7GJEoQyj2kpR5VoZAJiQKVcu3tBwLXnhiKfND5d6ulD1So2GH1nt01FhIEYHf1qtRWooThmoDlgAZCHA8JQZDZD",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      setApiResponse(result);
      setShowModal(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setApiResponse({ error: errorMessage });
      setShowModal(true);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Category */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-2">Create your template</h2>
          <p className="mb-4 text-gray-600">
            Choose the category that best describes your message template.
          </p>
        </div>

        {/* Name & Language */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template name
              </label>
              <input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., awards_texts"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en_US">English (United States)</option>
                <option value="es_ES">Spanish (Spain)</option>
                <option value="fr_FR">French (France)</option>
                <option value="de_DE">German (Germany)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Components */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Template components</h2>

          {/* Header */}
          <div className="mb-6 p-4 border border-gray-200 rounded-md">
            <h3 className="font-medium mb-2">Header (Optional)</h3>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Format
              </label>
              <select
                value={headerFormat}
                onChange={(e) => setHeaderFormat(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="TEXT">Text</option>
                <option value="IMAGE">Image</option>
                <option value="DOCUMENT">Document</option>
                <option value="VIDEO">Video</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Text
              </label>
              <textarea
                value={headerText}
                onChange={(e) => setHeaderText(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Limited Seats Available"
              />
            </div>
          </div>

          {/* Body */}
          <div className="mb-6 p-4 border border-gray-200 rounded-md">
            <h3 className="font-medium mb-2">Body</h3>
            <textarea
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">
              Use {"{1}"}, {"{2}"}, etc. for dynamic variables.
            </p>
          </div>

          {/* Buttons */}
          <div className="p-4 border border-gray-200 rounded-md">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Buttons (Optional)</h3>
              <button
                type="button"
                onClick={addButton}
                className="text-blue-600 text-sm font-medium"
                disabled={buttons.length >= 3}
              >
                + Add button
              </button>
            </div>
            <div className="space-y-2">
              {buttons.map((btn, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <select
                    value={btn.type}
                    onChange={(e) => updateButton(idx, "type", e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="QUICK_REPLY">Quick Reply</option>
                    <option value="URL">URL</option>
                    <option value="PHONE_NUMBER">Phone Number</option>
                  </select>
                  <input
                    type="text"
                    value={btn.text}
                    onChange={(e) => updateButton(idx, "text", e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1 flex-1"
                    placeholder="Button text"
                  />
                  <button
                    type="button"
                    onClick={() => removeButton(idx)}
                    className="text-red-500 hover:text-red-700 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            onClick={() => {
              if (window.confirm("Discard all changes?")) {
                setTemplateName("");
                setHeaderText("");
                setBodyText("Hi {{name}} 👋,\n\nThank you...");
                setButtons([
                  { type: "QUICK_REPLY", text: "Yes, I am Interested" },
                  { type: "QUICK_REPLY", text: "Not Interested" },
                ]);
              }
            }}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3"
          >
            Discard
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto shrink-0">
        <h3 className="text-lg font-semibold mb-4">Template preview</h3>
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="bg-white rounded-lg p-3 max-w-xs mx-auto">
            {headerText && (
              <div className="text-sm font-bold text-gray-800 mb-2">
                {headerText}
              </div>
            )}
            <div className="text-sm text-gray-800 whitespace-pre-line mb-3">
              {bodyText}
            </div>
            <div className="space-y-2">
              {buttons.map((btn, idx) => (
                <div
                  key={idx}
                  className="bg-blue-50 border border-blue-200 rounded px-3 py-1 text-xs text-blue-700 text-center"
                >
                  {btn.text}
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-2">11:59 AM</div>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="font-medium mb-2">This template is good for</h4>
          <p className="text-sm text-gray-600 mb-4">
            Welcome messages, promotions, offers, newsletters
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3">API Response</h3>
            <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-60">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
