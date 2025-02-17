import { useEffect } from "react";
import { useRooms } from "../hooks/useRooms";

interface Member {
  id: number;
  username: string;
}

export function Members() {
  const { selectedRoom, fetchMember, members } = useRooms();

  useEffect(() => {
    if (selectedRoom) {
      fetchMember(selectedRoom.id);
    }
  }, []);

  return (
    <div className="w-1/6 flex flex-col items-center bg-gray-800 p-4 border-l-2 border-gray-700">
      {selectedRoom ? (
        <>
          <h2 className="text-lg font-semibold mb-4">Usuários na Sala</h2>
          <div className="bg-gray-700 p-3 rounded-md flex-1 flex flex-col space-y-2 overflow-y-auto w-full">
            {members.map((user: Member, index: number) => {
              // const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`; // Cores vivas e aleatórias
              const randomColor = `hsl(0, 0%, ${Math.floor(Math.random() * 100)}%)`;
              return (
                <span key={index} style={{ color: randomColor }} className="text-lg">
                  {user.username}
                </span>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex-grow flex items-center justify-center text-gray-500">
          <p className="text-center">Selecione uma sala para começar o chat.</p>
        </div>
      )}

      {/* Área de créditos | Redes sociais | Github */}
      <div className="w-full h-auto p-4">
        <p className="text-sm text-center">Erik WTG</p>
      </div>
    </div>
  );
}