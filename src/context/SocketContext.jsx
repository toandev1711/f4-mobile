import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
} from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "./AuthContext";

const SocketContext = createContext();

export const SocketProvider = ({ userId, children }) => {
  const clientRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [isUpdateAvailable, setIsUpdateAvailble] = useState(true);
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const { setCompletedBooking } = useAuth();
  useEffect(() => {
    if (!userId) return;
    const client = new Client({
      webSocketFactory: () => new SockJS("http://192.168.16.184:8080/ws"),
      connectHeaders: {},
      debug: (msg) => console.log("STOMP: ", msg),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    clientRef.current = client;

    client.onConnect = () => {
      console.log("✅ WebSocket connected");
      setConnected(true);

      client.subscribe(`/user/${userId}/queue/messages`, (payload) => {
        const receivedMessage = JSON.parse(payload.body);
        if (!receivedMessage.timestamp) {
          receivedMessage.timestamp = new Date().toISOString();
        }
        setMessages((prev) => [...prev, receivedMessage]);
        onMessageReceived(receivedMessage);
      });
      if (userId) {
        client.subscribe(`/user/${userId}/queue/booking-status`, (payload) => {
          try {
            const notification = JSON.parse(payload.body);
            navigation.navigate("DriverAcceptedScreen");
          } catch (err) {
            console.error("Error parsing booking status message:", err);
          }
        });
        client.subscribe(
          `/user/${userId}/queue/booking-completed`,
          (message) => {
            navigation.navigate("RatingScreen");
          }
        );
      }
    };

    client.onStompError = (frame) => {
      console.error("STOMP error:", frame.headers["message"]);
      setConnected(false);
    };

    client.onWebSocketError = (error) => {
      console.error("WebSocket error:", error);
      setConnected(false);
    };

    client.onDisconnect = () => {
      console.log("WebSocket disconnected");
      setConnected(false);
    };

    client.activate();

    return () => {
      client.deactivate();
      console.log("WebSocket disconnected");
    };
  }, [userId]);

  const sendMessage = (receiverId, content) => {
    if (!clientRef.current || !clientRef.current.connected) {
      console.warn("⚠️ WebSocket is not connected");
      return;
    }
    const message = {
      senderId: userId,
      receiverId,
      content,
      timestamp: new Date().toISOString(),
    };
    clientRef.current.publish({
      destination: "/app/chat",
      body: JSON.stringify(message),
    });
    setMessages((prev) => [...prev, message]);
  };

  return (
    <SocketContext.Provider
      value={{
        connected,
        isUpdateAvailable,
        setIsUpdateAvailble,
        sendMessage,
        messages,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
