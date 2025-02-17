// import { io } from "socket.io-client";

// import { Message } from "../contexts/MessageContext";

// export const socket = io("http://infitiny_base_api:3002", {
//   transports: ["websocket"],
// });

// export const initializeSocket = (roomId: string, setMessages: (messages: Message[]) => void) => {
//   socket.on("connect", () => {
//     console.log("Connected to server");
//   });

//   socket.on("disconnect", () => {
//     console.log("Disconnected from server");
//   });

//   socket.on("message", (message: Message) => {
//     console.log("Message received:", message);
//   });

//   socket.on("join_room", (roomId: string) => {
//     console.log("Joined room:", roomId);
//   });

//   socket.on("leave_room", (roomId: string) => {
//     console.log("Left room:", roomId);
//   });
// };

// export const sendMessage = (message: Message) => {
//   socket.emit("message", message);
// };

// export const joinRoom = (roomId: string) => {
//   socket.emit("join_room", roomId);
// };

// export const leaveRoom = (roomId: string) => {
//   socket.emit("leave_room", roomId);
// };
