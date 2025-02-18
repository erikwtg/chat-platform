import { useState } from "react";
import { useMessages } from "../hooks/useMessages";
import { useRooms } from "../hooks/useRooms";
import { useAuth } from "../hooks/useAuth";

export function Footer() {
  const [message, setMessage] = useState('');
  const { createMessage } = useMessages();
  const { selectedRoom } = useRooms();
  const { user } = useAuth();

  const handleSendMessage = () => {
    createMessage({
      content: message,
      roomId: selectedRoom?.id?.toString() || '',
      userId: user?.id || '',
    });

    setMessage('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <footer className="mt-auto bg-gray-800 p-4 flex border-t-2 border-gray-700">
      <input
        type="text"
        className="flex-grow bg-transparent border-2 border-green-400 text-green-400 p-2 rounded-l-md outline-none"
        placeholder="Digite uma mensagem..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        className="bg-green-400 text-gray-900 p-2 rounded-r-md hover:bg-green-500 transition duration-200"
        onClick={handleSendMessage}
      >
        Enviar
      </button>
    </footer>
  );
}