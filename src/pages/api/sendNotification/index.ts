import { NextApiRequest, NextApiResponse } from "next";
import webPush from "web-push";
import { loadSubscriptions, removeSubscriptions } from "@/utils/subscriptions";
import { VAPIDKeys } from "@/utils/vapidKeys"; // Assuming you store VAPID keys securely

// Configure web-push with VAPID keys
const vapidKeys = VAPIDKeys; // Import your VAPID keys securely
webPush.setVapidDetails(
  "mailto:manhhieua1@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

type Subscription = {
  endpoint: string;
  keys: {
    auth: string;
    p256dh: string;
  };
};

type NotificationPayload = {
  notification: {
    title: string;
    body: string;
    icon?: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { notification } = req.body;
  if (!notification || !notification.title || !notification.body) {
    return res.status(400).json({ error: "Invalid notification payload" });
  }

  const notificationPayload: NotificationPayload = { notification };

  let subscriptions: Subscription[] = loadSubscriptions();

  // Filter out invalid subscriptions
  const validSubscriptions: Subscription[] = [];
  const invalidSubscriptions: Subscription[] = [];

  await Promise.all(
    subscriptions.map(async (sub) => {
      try {
        await webPush.sendNotification(
          sub,
          JSON.stringify(notificationPayload.notification)
        );
        validSubscriptions.push(sub);
      } catch (error: any) {
        if (error.statusCode === 410) {
          // Subscription is no longer valid
          invalidSubscriptions.push(sub);
        } else {
          console.error("Error sending notification:", error);
        }
      }
    })
  );

  // Log invalid subscriptions or handle them appropriately
  if (invalidSubscriptions.length > 0) {
    console.log("Removing invalid subscriptions:", invalidSubscriptions);
    // Remove invalid subscriptions from storage
    removeSubscriptions(invalidSubscriptions);
  }

  try {
    await Promise.all(
      validSubscriptions.map((sub) =>
        webPush.sendNotification(
          sub,
          JSON.stringify(notificationPayload.notification)
        )
      )
    );
    res.status(200).json({ message: "Notification sent successfully." });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Failed to send notification." });
  }
}
