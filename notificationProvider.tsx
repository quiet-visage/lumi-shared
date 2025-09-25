import { AdminTokenContext } from "@/app/providers";
import { Notification } from "./notificationModels";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { addToast } from "@heroui/react";

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;

  // markAllAsRead: () => void;
  //clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const token = useContext(AdminTokenContext);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [connected, setIsConnected] = useState(false);

  useEffect(() => {
    console.log("notification provider connected? ", connected);
  }, [connected]);

  useEffect(() => {
    console.log("------------- token", token);
    if (!token) return;
    console.log("------------- sse");
    const sseUrl = `${process.env.BASE_URL}/notify/events?authToken=${token}`;
    const sse = new EventSource(sseUrl);
    sse.onopen = () => {
      setIsConnected(true);
    };
    sse.onerror = (err) => {
      console.log("sse error ", err);
    };
    sse.onmessage = (event) => {
      console.log("event received", event);
      try {
        const eventData = JSON.parse(event.data);
        const notification: Notification = eventData.payload;
        console.log(notification);
        setNotifications((prev) => [notification, ...prev]);

        addToast({
          title: notification.title,
          description: notification.message,
        });
      } catch (e) {
        console.log("failed to parse ", e);
      }
    };
    return () => {
      console.log("closing");
      sse.close();
    };
  }, [token]);
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  return (
    <NotificationContext.Provider value={{ notifications, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};
