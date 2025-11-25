// src/components/AiChatWidget.tsx

import { useState } from "react";
import {
  Send,
  X,
  Bot,
  User,
  Sparkles,
} from "lucide-react";

const AiChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstOpen, setFirstOpen] = useState(true); // 👈 NEW

  const handleOpen = () => {
    setOpen(true);

    // 👇 Auto greeting only first time
    if (firstOpen) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Hello Sparsh 👋, do you have any query about your marketing dashboard?",
        },
      ]);
      setFirstOpen(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const token = import.meta.env.VITE_OPENAI_API_KEY;
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are OphMate AI assistant." },
            { role: "user", content: input },
          ],
        }),
      });

      const data = await res.json();
      const aiResponse = data.choices?.[0]?.message?.content || "No response";

      const aiMessage = { sender: "ai", text: aiResponse };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Error: Unable to connect to AI." },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-xl flex items-center gap-2"
      >
        <Sparkles className="w-5 h-5" />
        Chat with OphMate AI
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 md:w-96 bg-white border shadow-xl rounded-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              <h2 className="font-semibold">OphMate AI</h2>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="hover:bg-blue-700 p-1 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start gap-2 ${
                  msg.sender === "user" ? "justify-end" : ""
                }`}
              >
                {msg.sender === "ai" && (
                  <Bot className="w-5 h-5 text-blue-600" />
                )}

                <div
                  className={`px-3 py-2 rounded-lg max-w-[75%] text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border"
                  }`}
                >
                  {msg.text}
                </div>

                {msg.sender === "user" && (
                  <User className="w-5 h-5 text-gray-600" />
                )}
              </div>
            ))}

            {loading && (
              <div className="text-gray-500 text-sm">Thinking...</div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t bg-white flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 border rounded-lg px-3 py-2 text-sm"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AiChatWidget;
