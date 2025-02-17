import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";

interface WebSocketContextType {
  sendMessage: (event: string, data?: any) => void;
  messages: any[];
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");
    socketRef.current = socket;

    socket.onopen = () => console.log("WebSocket conectado!");

    socket.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      setMessages((prev) => [...prev, messageData]);
    };

    socket.onclose = () => console.log("WebSocket desconectado!");

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = (event: string, data?: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ event, data }));
    }
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage, messages }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket deve ser usado dentro de um WebSocketProvider");
  }
  return context;
};