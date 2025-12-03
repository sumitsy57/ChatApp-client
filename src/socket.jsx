// socket.js
import { createContext, useContext } from "react";
import { io } from "socket.io-client";   // <-- named import
import { server } from "./constants/config";

const SocketContext = createContext(null);

// create ONE socket instance for the whole app
const socket = io(server, {
  withCredentials: true,           // send cookies for auth
});

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const getSocket = () => useContext(SocketContext);
