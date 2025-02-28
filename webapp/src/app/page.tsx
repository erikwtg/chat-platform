"use client"
import { useRooms } from './hooks/useRooms';

import { Sidebar } from './components/Sidebar'
import { ChatWindow } from './components/ChatWindow'
import { Footer } from './components/Footer'
import { Members } from './components/Members'

interface Message {
  user: string;
  text: string;
}

interface Room {
  id: number;
  name: string;
}

export default function Home() {
  const { selectedRoom } = useRooms();

  return (
    <div className="h-screen bg-gray-900 text-green-400 font-mono flex flex-col">
      <header className="bg-gray-800 p-4 text-center border-b-2 border-gray-700">
        <h1 className="text-xl font-bold">Chat Retro mIRC</h1>
      </header>

      <div className="flex-grow flex">
        <Sidebar />

        <main className="flex-1 flex flex-col">
          {selectedRoom ? (
            <>
              <ChatWindow />
              <Footer />
            </>
          ) : (
            <div className="flex-grow flex items-center justify-center text-gray-500">
              Selecione uma sala para começar o chat.
            </div>
          )}
        </main>

        {/* Área de usuários na sala */}
        <Members />
      </div>
    </div>
  );
}
