// hooks/useNotification.ts

import { useEffect, useState } from "react";

type NotificationCallback = () => void;

export default function useNotification(callback?: NotificationCallback) {
  const [notificationAllowed, setNotificationAllowed] = useState(false);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      if ("Notification" in window && Notification.permission !== "granted") {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("Permission granted for notifications.");
          setNotificationAllowed(true);
          if (callback) callback();
        } else {
          console.warn("Permission denied for notifications.");
        }
      } else {
        console.log(
          "Notification permission already granted or not supported.",
        );
      }
    };

    requestNotificationPermission();
  }, [callback]);

  return notificationAllowed;
}
