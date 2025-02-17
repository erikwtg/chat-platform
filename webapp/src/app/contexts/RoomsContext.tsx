"use client"
import { createContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

export interface Room {
  id: number;
  name: string;
  description?: string;
  isMember?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Member {
  id: number;
  username: string;
}

interface RoomsContextType {
  rooms: Room[];
  members: Member[];
  loading: boolean;
  selectedRoom: Room | null;
  setSelectedRoom: (room: Room | null) => void;
  createRoom: (room: { name: string }) => Promise<void>;
  fetchRooms: () => Promise<void>;
  joinRoom: (roomId: number) => Promise<void>;
  leaveRoom: (roomId: number) => Promise<void>;
  fetchMember: (roomId: number) => Promise<void>;
}

export const RoomsContext = createContext<RoomsContextType>({} as RoomsContextType);

export const RoomsProvider = ({ children }: { children: ReactNode }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/rooms", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();

        setRooms(data);
        setLoading(false);
      }

      return
    } catch (error) {
      console.error("Erro ao buscar salas:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createRoom = async (room: { name: string }) => {
    try {
      setLoading(true);

      const data = {
        name: room.name
      }

      const response = await fetch("http://localhost:3000/rooms", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      const newRoom = await response.json();


      console.log(newRoom);
      // Todo[Erik] - Fazer essa implementação na API.
      Object.assign(newRoom, { isMember: false });

      if (response.ok) {
        setRooms([...rooms, ...newRoom]);
        return
      } else {
        throw new Error("Falha ao criar sala");
      }
    } catch (error) {
      console.error("Erro ao criar sala:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const joinRoom = async (roomId: number) => {
    try {
      setLoading(true);

      const data = {
        roomId: roomId,
        userId: user?.id
      }

      const response = await fetch(`http://localhost:3000/rooms-memberships/join`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      const newRoom = await response.json();

      if (response.ok) {
        const updatedRooms = rooms.map(room =>  
          room.id === roomId ? { ...room, isMember: true } : room
        );
        setRooms(updatedRooms);
        return
      }
    } catch (error) {
      console.error("Erro ao entrar na sala:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const leaveRoom = async (roomId: number) => {
    try {
      setLoading(true);

      const data = {
        roomId: roomId,
        userId: user?.id
      }

      const response = await fetch(`http://localhost:3000/rooms-memberships/leave`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedRooms = rooms.map(room =>  
          room.id === roomId ? { ...room, isMember: false } : room
        );
        setRooms(updatedRooms); 
        return
      }
    } catch (error) {
      console.error("Erro ao sair da sala:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Todo[Erik] - Pode ser usado para buscar mebro na sala e atualizar o estado do membro - A consulta do banco pode retornar sem adicionar o parametro isMember
  const fetchMember = async (roomId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/rooms-memberships/${roomId}/members/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
      },
        method: "GET",
      });

      const data = await response.json();

      console.log(data);

      return data;
    } catch (error) {
      console.error("Erro ao buscar membros da sala:", error);
      throw error;
    }
  }

  return (
    <RoomsContext.Provider value={{ 
      rooms, 
      members,
      loading, 
      selectedRoom, 
      setSelectedRoom, 
      createRoom, 
      fetchRooms, 
      joinRoom, 
      leaveRoom, 
      fetchMember
    }}>
      {children}
    </RoomsContext.Provider>
  );
};
