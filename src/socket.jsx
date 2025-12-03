// socket.js
import { createContext, useContext } from "react";
import { io } from "socket.io-client";
import { server } from "./constants/config";

const SocketContext = createContext(null);

const createSocket = () => {
  const token = localStorage.getItem("chattu-token");
  return io(server, {
    withCredentials: true,
    auth: {
      token,   // 👈 sent to socketAuthenticator
    },
  });
};

const socket = createSocket();

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const getSocket = () => useContext(SocketContext);
