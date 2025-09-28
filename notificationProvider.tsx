import {
  Notification,
  NotificationActionType,
  NotificationType,
} from "./notificationModels";
import {
  createContext,
  memo,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { addToast, Button } from "@heroui/react";
import { useAdminToken } from "@/app/adminTokenProvider";
import {
  DiscussionProviderContextType,
  useDiscussion,
} from "../admin/discussionProvider";

type NotificationReceivedCb = (notif: Notification) => void;

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;

  // markAllAsRead: () => void;
  // clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

const NotificationActionContent = memo(
  ({
    notification,
    discussion,
  }: {
    notification: Notification;
    discussion: DiscussionProviderContextType;
  }) => {
    if (notification.actions.length === 0) return <></>;
    const action = notification.actions[0];

    const onSeeTicket = () => {
      discussion.open(action.metadata.ticketId);
    };

    const actionMap = {
      [NotificationActionType.VIEW_TICKET]: (
        <Button size="sm" variant="bordered" onPress={() => onSeeTicket()}>
          Ver Chamado
        </Button>
      ),
    };

    if (action.type in actionMap) {
      return (
        <div className="flex w-full justify-center gap-2 pt-2">
          {actionMap[action.type as NotificationActionType]}
        </div>
      );
    }
    return <></>;
  }
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const token = useAdminToken();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const discussion = useDiscussion();

  useEffect(() => {
    if (!token) return;
    const sseUrl = `${process.env.BASE_URL}/notify/events?authToken=${token}`;
    const sse = new EventSource(sseUrl);
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
          classNames: {
            wrapper: "w-full truncate",
            base: "flex flex-col items-start w-64 line-clamp-2",
          },
          timeout: 100000000,
          title: notification.title,
          description: notification.message,
          endContent: (
            <NotificationActionContent
              discussion={discussion}
              notification={notification}
            />
          ),
        });
      } catch (e) {
        console.log("failed to parse ", e);
      }
    };
    return () => {
      console.log("closing");
      sse.close();
    };
  }, [token, discussion]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
      }}
    >
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
