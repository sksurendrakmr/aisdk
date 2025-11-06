"use client";

import { ChatMessage } from "@/app/api/tools/route";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";

export default function ToolPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error, stop } = useChat<ChatMessage>({
    transport: new DefaultChatTransport({
      api: "/api/tools",
    }),
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput("");
  };
  return (
    <>
      {error && <div className="text-red-500">{error.message}</div>}
      {messages.map((message) => (
        <div key={message.id}>
          <div>{message.role === "user" ? "You" : "AI"}</div>
          {message.parts.map((parts, index) => {
            switch (parts.type) {
              case "text":
                return <div key={`${message.id} - ${index}`}>{parts.text}</div>;
              case "tool-getWeather":
                switch (parts.state) {
                  case "input-streaming":
                    return <div>Receiving weather request...</div>;
                }
                return null;
              default:
                return null;
            }
          })}
        </div>
      ))}

      {(status === "submitted" || status === "streaming") && (
        <div>Loading...</div>
      )}
      <form onSubmit={handleFormSubmit}>
        <div>
          <input
            type="text"
            placeholder="How can I help you?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {status === "submitted" || status === "streaming" ? (
            <button onClick={stop}>Stop</button>
          ) : (
            <button type="submit" disabled={status !== "ready"}>
              Send
            </button>
          )}
        </div>
      </form>
    </>
  );
}
