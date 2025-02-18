import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Message } from "../contexts/MessageContext";

interface WebSocketHook {
  sendMessage: (event: string, data?: any) => void;
  wsMessages: Message[];
}

export const useWebSocket = (endpoint: string): WebSocketHook => {
  const [wsMessages, setWsMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(`http://localhost:3000${endpoint}`);
    socketRef.current = socket;

    socket.on("connect", () => console.log(`WebSocket conectado em ${endpoint}`));

    socket.on("message_received", (event) => {
      const updatedMessages = [...wsMessages, event];
      setWsMessages(updatedMessages);
    });

    socket.on("disconnect", () => console.log(`WebSocket desconectado de ${endpoint}`));

    return () => {
      socket.close();
    };
  }, [endpoint]);

  const sendMessage = (event: string, data?: any) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit(event, data);
    }
  };

  return { sendMessage, wsMessages };
};