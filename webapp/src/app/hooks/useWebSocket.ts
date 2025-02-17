import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface WebSocketHook {
  sendMessage: (event: string, data?: any) => void;
  wsMessages: any[];
}

export const useWebSocket = (endpoint: string): WebSocketHook => {
  const [wsMessages, setWsMessages] = useState<any[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(`http://localhost:3000${endpoint}`);
    socketRef.current = socket;

    socket.on("connect", () => console.log(`WebSocket conectado em ${endpoint}`));

    socket.on("message_received", (event) => {
      const messageData = JSON.parse(event.data);
      console.log("Mensagem recebida no WebSocket: ", messageData);
      setWsMessages((prev) => [...prev, messageData]);
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