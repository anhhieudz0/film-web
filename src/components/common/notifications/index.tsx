// components/NotificationPrompt.tsx

import { useEffect } from "react";

function NotificationPrompt() {
  useEffect(() => {
    async function requestPermission() {
      const permission = await Notification.requestPermission();
      console.log("Permission:", permission);
    }

    requestPermission();
  }, []);

  return null;
}

export default NotificationPrompt;
