export interface Room {
  id: number;
  name: string;
}

interface RoomsProps {
  handleCreateRoom: () => void;
  rooms: Room[];
}

export function Rooms({ handleCreateRoom, rooms }: RoomsProps) {
  return (
    <div className='flex flex-col gap-4'>
      <button
        className="w-full mt-4 bg-green-400 text-gray-900 p-2 rounded-md hover:bg-green-500 transition duration-200"
        onClick={handleCreateRoom}
      >
        Criar Nova Sala
      </button>
      <h2 className="text-lg text-center font-semibold">Salas Disponíveis</h2>
      <ul className="flex-1 min-h-0 overflow-y-auto space-y-2 mt-4">
        {rooms.map((room, index) => (
          <li key={index} className="bg-gray-700 p-2 rounded-md hover:bg-gray-600 cursor-pointer">
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
}