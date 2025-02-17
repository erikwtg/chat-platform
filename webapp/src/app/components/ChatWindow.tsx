"use client"
import { useEffect } from "react";
import { useMessages } from "../hooks/useMessages";
import { useRooms } from "../hooks/useRooms";

const formatDate = (date?: string) => {
  if (!date) return '';
  return new Date(date).toLocaleTimeString();
};

export function ChatWindow() {
  const { messages, fetchMessages } = useMessages();
  const { selectedRoom } = useRooms();
  useEffect(() => {
    if (selectedRoom) {
      fetchMessages();
    }
  }, []);

  return (
    <div className="flex-grow overflow-auto mt-4 max-h-[calc(100vh-150px)]">
      <div className="space-y-1">
        {messages.map((msg, index) => (
          <div key={index} className="flex flex-col p-2">
            <span className="font-semibold">{msg?.username ?? 'Você'} - {formatDate(msg?.createdAt)}</span>
            <span className="font-semibold px-4 text-white">{msg.content}</span>
          </div>
        ))}
      </div>
    </div>
  );
}