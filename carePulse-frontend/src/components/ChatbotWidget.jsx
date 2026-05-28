import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import api from "../api/axios";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi! I'm CarePulse AI. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await api.post("/chat", { message: userMsg });
      setMessages(prev => [...prev, { role: "bot", content: response.data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormattedText = (text) => {
    if (!text) return "";
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ fontWeight: 700, opacity: 0.95 }}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            width: 360,
            height: 540,
            background: "#ffffff",
            borderRadius: 20,
            boxShadow: "0 12px 48px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            marginBottom: 16,
            overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.05)"
          }}
        >
          {/* Header */}
          <div style={{ background: "linear-gradient(135deg, #4f46e5, #ec4899)", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#ffffff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 10, height: 10, background: "#4ade80", borderRadius: "50%", boxShadow: "0 0 12px #4ade80" }} />
              <div>
                <span style={{ fontWeight: 700, fontFamily: "var(--font-display)", fontSize: 18, display: "block", lineHeight: 1 }}>CarePulse AI</span>
                <span style={{ fontSize: 12, opacity: 0.8, marginTop: 4, display: "block" }}>Always here to help</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: "rgba(255,255,255,0.2)", borderRadius: "50%", padding: 6, border: "none", color: "#ffffff", cursor: "pointer", display: "flex", transition: "background 0.2s" }} onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.3)"} onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px", display: "flex", flexDirection: "column", gap: 16, background: "#fafafa" }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  background: msg.role === "user" ? "linear-gradient(135deg, #4f46e5, #ec4899)" : "#ffffff",
                  color: msg.role === "user" ? "#ffffff" : "#1f2937",
                  padding: "14px 18px",
                  borderRadius: msg.role === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  boxShadow: msg.role === "bot" ? "0 4px 12px rgba(0,0,0,0.03)" : "0 4px 16px rgba(236, 72, 153, 0.2)",
                  border: msg.role === "bot" ? "1px solid rgba(0,0,0,0.06)" : "none",
                  whiteSpace: "pre-wrap"
                }}
              >
                {renderFormattedText(msg.content)}
              </div>
            ))}
            {isLoading && (
              <div style={{ alignSelf: "flex-start", background: "#ffffff", padding: "14px 18px", borderRadius: "20px 20px 20px 4px", fontSize: 14.5, border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
                <span className="typing-dots" style={{ color: "#4f46e5", fontWeight: 600 }}>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} style={{ padding: "16px 20px", background: "#ffffff", borderTop: "1px solid rgba(0,0,0,0.05)", display: "flex", gap: 12 }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              style={{
                flex: 1,
                padding: "14px 20px",
                borderRadius: 24,
                border: "1px solid rgba(0,0,0,0.1)",
                outline: "none",
                fontSize: 14,
                background: "#f9fafb",
                transition: "border 0.2s",
              }}
              onFocus={(e) => e.target.style.border = "1px solid #4f46e5"}
              onBlur={(e) => e.target.style.border = "1px solid rgba(0,0,0,0.1)"}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                background: "linear-gradient(135deg, #4f46e5, #ec4899)",
                color: "#ffffff",
                border: "none",
                width: 48,
                height: 48,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
                opacity: isLoading || !input.trim() ? 0.6 : 1,
                boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
                transition: "transform 0.2s"
              }}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #4f46e5, #ec4899)",
          color: "#ffffff",
          border: "none",
          boxShadow: "0 8px 24px rgba(236, 72, 153, 0.4)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transform: isOpen ? "scale(0.85) rotate(90deg)" : "scale(1) rotate(0deg)"
        }}
      >
        {isOpen ? <X size={30} /> : <MessageSquare size={30} />}
      </button>
    </div>
  );
}
