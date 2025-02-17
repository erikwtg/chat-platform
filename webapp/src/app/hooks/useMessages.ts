import { useContext } from "react";
import { MessageContext } from "../contexts/MessageContext";

export const useMessages = () => useContext(MessageContext);
