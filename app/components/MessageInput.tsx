"use client";

import { useState, FormEvent } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const sendMessage = useMutation(api.messages.send);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);
    try {
      await sendMessage({ direction: "outbound", content: message.trim() });
    } catch (err) {
      console.error("Failed to send message:", err);
    }
    setMessage("");
    setSending(false);
  }

  return (
    <section data-testid="message-input" className="bg-card-bg border border-card-border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">Send Task</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a message or task to Schleppy..."
          className="flex-1 px-3 py-2 rounded-md bg-background border border-card-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent"
          disabled={sending}
        />
        <button
          type="submit"
          disabled={sending || !message.trim()}
          className="px-4 py-2 rounded-md bg-accent text-white text-sm font-medium hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </form>
    </section>
  );
}
