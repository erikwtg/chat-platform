interface Message {
  user: string;
  text: string;
}

interface ChatWindowProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function ChatWindow({ messages, setMessages }: ChatWindowProps) {
  return (
    <div className="flex-grow overflow-auto mt-4 max-h-[calc(100vh-150px)]">
      <div className="space-y-3">
        {messages.map((msg, index) => (
          <div key={index} className="bg-gray-700 p-2 rounded-md border border-gray-600">
            <span className="font-semibold">{msg.user}:</span> {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}