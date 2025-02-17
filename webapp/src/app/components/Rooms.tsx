"use client"
import { useState, useEffect } from "react"
import { useRooms } from "../hooks/useRooms"
import { Room } from "../contexts/RoomsContext"

export function Rooms() {
  const [roomName, setRoomName] = useState('');
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  const { rooms, createRoom, fetchRooms, joinRoom, leaveRoom, selectedRoom, selectRoom } = useRooms();

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleCreateRoom = () => {
    setIsCreatingRoom(true);
  };

  const handleSaveRoom = () => {
    setIsCreatingRoom(false);
    createRoom({ name: roomName });
  };

  const handleCancelRoom = () => {
    setIsCreatingRoom(false);
  };

  const handleJoinRoom = (roomId: number) => {
    joinRoom(roomId);
  };

  const handleLeaveRoom = (roomId: number) => {
    leaveRoom(roomId);
  };

  const handleSelectRoom = (roomId: number) => {
    const room = rooms.find(room => room.id === roomId);
    selectRoom(room as Room);
  };

  return (
    <div className='flex flex-col gap-4'>
      {!isCreatingRoom ? (
        <button
          className="w-full mt-4 bg-green-400 text-gray-900 p-2 rounded-md hover:bg-green-500 transition duration-200"
          onClick={handleCreateRoom}
      >
        Criar Nova Sala
      </button>
      ) : (
        <div className="flex gap-2">
          <button
            className="w-full mt-4 bg-red-400 text-gray-900 p-2 rounded-md hover:bg-red-500 transition duration-200"
            onClick={handleCancelRoom}
          >
            Cancelar
          </button>
          <button
            className="w-full mt-4 bg-green-400 text-gray-900 p-2 rounded-md hover:bg-green-500 transition duration-200"
            onClick={handleSaveRoom}
          >
            Salvar
          </button>
        </div>
      )}

      {isCreatingRoom && (
        <input
          id="roomName"
          type="text"
          className="bg-gray-700 text-green-400 p-2 rounded-md w-full mb-4"
          placeholder="Nome da Sala"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          autoComplete="off"
        />
      )}

      <h2 className="text-lg text-center font-semibold">Salas Disponíveis</h2>
      <ul className="flex-1 min-h-0 overflow-y-auto space-y-2 mt-4">
        {rooms.map((room, index) => (
          <li key={index} className={`flex justify-between p-2 rounded-md cursor-pointer ${selectedRoom?.id === room.id ? 'bg-green-400 text-gray-900' : 'bg-gray-700 hover:bg-gray-600'}`}>
            <button
              className={`flex justify-between w-full items-center rounded-md cursor-pointer ${selectedRoom?.id === room.id ? 'bg-green-400 text-gray-900' : 'bg-gray-700 hover:bg-gray-600'}`}
              onClick={() => handleSelectRoom(room.id)}
            >
              {room.name}

              {room.isMember ? (  
                <button
                  className={`p-2 rounded-md  transition duration-200 z-20 ${selectedRoom?.id !== room.id ? 'bg-green-400 text-gray-900 hover:bg-green-500' : 'bg-gray-700 text-green-400 hover:bg-gray-600'}`}
                  onClick={() => handleLeaveRoom(room.id)}
                >
                  Sair
                </button>
              ) : (
                <button
                  className={`p-2 rounded-md  transition duration-200 z-20 ${selectedRoom?.id !== room.id ? 'bg-green-400 text-gray-900 hover:bg-green-500' : 'bg-gray-700 text-green-400 hover:bg-gray-600'}`}
                  onClick={() => handleJoinRoom(room.id)}
                >
                  Entrar
                </button>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}