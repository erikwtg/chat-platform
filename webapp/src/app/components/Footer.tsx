import { useState } from "react";

export function Footer() {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    console.log('send message');
  };

  return (
    <footer className="bg-gray-800 p-4 flex border-t-2 border-gray-700">
      <input
        type="text"
        className="flex-grow bg-transparent border-2 border-green-400 text-green-400 p-2 rounded-l-md outline-none"
        placeholder="Digite uma mensagem..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
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