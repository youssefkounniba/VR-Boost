"use client";

import { useState } from "react";
import { MessageSquareMore, X, Send } from "lucide-react";

type Msg = { from: "bot" | "me"; text: string };

const INITIAL: Msg[] = [
  {
    from: "bot",
    text: "Hi 👋 Welcome to VR Boost! How can we help with your virtual visits today?",
  },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(INITIAL);
  const [draft, setDraft] = useState("");

  function send() {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { from: "me", text }]);
    setDraft("");
    // Mock auto-reply.
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Thanks for your message! One of our advisors will be right with you.",
        },
      ]);
    }, 700);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Panel */}
      {open && (
        <div className="flex h-[460px] w-[340px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl bg-white shadow-panel">
          {/* Header */}
          <div className="flex items-center gap-3 bg-ink px-4 py-3.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white">
              <MessageSquareMore className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-white">Chat with us</p>
              <p className="flex items-center gap-1.5 text-xs text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                We typically reply in a few minutes
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-[#F4F5F7] p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm ${
                    m.from === "me"
                      ? "rounded-br-sm bg-accent text-white"
                      : "rounded-bl-sm bg-white text-ink shadow-card"
                  }`}
                >
                  {m.text}
                </p>
              </div>
            ))}
          </div>

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 border-t border-gray-100 bg-white p-3"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message..."
              className="field flex-1 border border-gray-200"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!draft.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-white transition-colors hover:bg-black disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white shadow-panel transition-transform hover:scale-105 active:scale-95"
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquareMore className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}
