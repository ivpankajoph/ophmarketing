import { useEffect, useRef, useState } from "react";
import { Bot, User, Send } from "lucide-react";

const ChatbotPage = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const token = import.meta.env.VITE_OPENAI_API_KEY;

 
  useEffect(() => {
    setMessages([
      {
        sender: "ai",
        text: "Hey Pankaj 👋, you got no leads right now. How can I assist you?",
      },
    ]);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

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
            {
              role: "system",
              content: "You are a chatbot for a Ophmate marketing dashboard. Help users with CRM related tasks. ",
            },
            { role: "user", content: input },
          ],
        }),
      });

      const data = await res.json();
      const aiResponse = data.choices?.[0]?.message?.content || "No response";

      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Error: Unable to connect to AI." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="h-screen flex flex-col bg-linear-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-blue-700 text-white p-3 sm:p-4 md:p-5 flex items-center gap-2 sm:gap-3 shadow-lg">
        <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg backdrop-blur-sm">
          <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold tracking-tight truncate">
            OphMate AI
          </h2>
          <p className="text-xs text-blue-100 hidden sm:block">
            Your intelligent CRM assistant
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="hidden sm:inline">Online</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
        <div className="max-w-4xl mx-auto w-full space-y-3 sm:space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2 sm:gap-3 ${
                msg.sender === "user" ? "justify-end" : ""
              } animate-in fade-in slide-in-from-bottom-2 duration-300`}
            >
              {msg.sender === "ai" && (
                <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              )}

              <div
                className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl max-w-[85%] sm:max-w-[75%] md:max-w-[70%] text-sm sm:text-base shadow-sm ${
                  msg.sender === "user"
                    ? "bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-br-md"
                    : "bg-white border border-gray-100 text-gray-800 rounded-bl-md"
                }`}
              >
                <p className="leading-relaxed wrap-break-word">{msg.text}</p>
              </div>

              {msg.sender === "user" && (
                <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-linear-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center shadow-md">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 sm:gap-3 animate-in fade-in duration-300">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white/80 backdrop-blur-sm p-3 sm:p-4 md:p-5">
        <div className="max-w-4xl mx-auto w-full flex items-end gap-2 sm:gap-3">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Type your message... (Shift + Enter for new line)"
              rows={1}
              className="w-full border border-gray-300 rounded-xl sm:rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-[42px] max-h-32"
              style={{
                height: "auto",
                minHeight: "42px",
              }}
              onInput={(e) => {
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height =
                  Math.min(e.currentTarget.scrollHeight, 128) + "px";
              }}
            />
          </div>

          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="shrink-0 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md group"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-2 sm:mt-3 max-w-4xl mx-auto">
          Powered by OphMate AI • Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};

export default ChatbotPage;
