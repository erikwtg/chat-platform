import { useContext } from "react";
import { RoomsContext } from "../contexts/RoomsContext";

export const useRooms = () => useContext(RoomsContext);
