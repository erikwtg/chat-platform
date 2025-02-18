"use client"
import { createContext, useState, useEffect, ReactNode } from "react";
import { useRooms } from "../hooks/useRooms";
import { useWebSocket } from "../hooks/useWebSocket";

export interface Message {
  id?: string;
  content: string;
  username?: string;
  roomId: string;
  userId: string;
  editHistory?: Message[];
  isEdited?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface MessageContextType {
  messages: Message[];
  loading: boolean;
  selectedMessage: Message | null;
  setSelectedMessage: (message: Message | null) => void;
  createMessage: (message: Message) => Promise<void>;
  fetchMessages: () => Promise<void>;
  wsMessages: any[];
  sendMessage: (event: string, data?: any) => void;
}

export const MessageContext = createContext<MessageContextType>({} as MessageContextType);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(false);
  const { selectedRoom } = useRooms();
  const { sendMessage, wsMessages } = useWebSocket("/message");

  useEffect(() => {
    if (selectedRoom) {
      fetchMessages();
    }
  }, [selectedRoom]);
  // Todo[Erik] - Ao carregar mensagens por sala para de funcionar realtime do socket.

  useEffect(() => {
    const updatedMessages = [...messages, ...wsMessages];
    setMessages(updatedMessages);
  }, [wsMessages]);

  const fetchMessages = async () => {
    if (!selectedRoom || !selectedRoom.isMember) return;
    
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/messages/${selectedRoom.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
        method: "GET",
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(data);
      }
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createMessage = async (message: Message) => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/messages", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(message),
      });

      const data = await response.json();

      if ('error' in data) {
        alert(data.message);
        return;
      }

      if (response.ok) {
        sendMessage("send_message", data);
      }
    } catch (error) {
      console.error("Erro ao criar mensagem:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <MessageContext.Provider value={{ messages, loading, selectedMessage, setSelectedMessage, createMessage, fetchMessages, wsMessages: wsMessages, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
