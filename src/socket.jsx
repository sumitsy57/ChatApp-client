// socket.js
import { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { server } from "./constants/config";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("chattu-token") || null;

    const s = io(server, {
      withCredentials: true,
      transports: ["websocket"],
      auth: { token },
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const getSocket = () => useContext(SocketContext);
