// src/socket.js
import { createContext, useContext } from "react";
import { io } from "socket.io-client";
import { server } from "./constants/config";

const SocketContext = createContext(null);

// create socket once, synchronously
const token = localStorage.getItem("chattu-token") || null;

const socket = io(server, {
  withCredentials: true,
  transports: ["websocket"],
  auth: { token },
});

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const getSocket = () => useContext(SocketContext);
