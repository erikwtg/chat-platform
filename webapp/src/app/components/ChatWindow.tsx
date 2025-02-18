"use client"
import { useEffect, useRef } from "react";
import { useMessages } from "../hooks/useMessages";
import { useRooms } from "../hooks/useRooms";

const formatDate = (date?: string) => {
  if (!date) return '';
  return new Date(date).toLocaleTimeString();
};

export function ChatWindow() {
  const { messages, fetchMessages } = useMessages();
  const { selectedRoom } = useRooms();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedRoom) {
      fetchMessages();
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-grow overflow-auto mt-4 max-h-[calc(100vh-150px)]">
      <div className="space-y-1">
        {messages.map((msg, index) => (
          <div key={index} className="flex flex-col p-2">
            <span className="font-semibold">{msg?.username ?? 'Você'} - {formatDate(msg?.createdAt)}</span>
            <span className="font-semibold px-4 text-white">{msg.content}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}