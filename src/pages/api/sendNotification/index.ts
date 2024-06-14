// pages/api/sendNotification.ts

import { NextApiRequest, NextApiResponse } from "next";
import webPush from "web-push";
import { loadSubscriptions } from "@/utils/subscriptions";
import { VAPIDKeys } from "@/utils/vapidKeys"; // Assuming you store VAPID keys securely

// Configure web-push with VAPID keys
const vapidKeys = VAPIDKeys; // Import your VAPID keys securely
webPush.setVapidDetails(
  "mailto:manhhieua1@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const notificationPayload = {
      notification: {
        title: "New Notification",
        body: "This is a push notification sent from the server.",
        icon: "https://example.com/icon.png",
      },
    };

    let subscriptions = loadSubscriptions();

    // Filter out invalid subscriptions
    subscriptions = subscriptions.filter((sub) => {
      // Check if the endpoint is still valid
      return !webPush
        .sendNotification(sub, JSON.stringify(notificationPayload))
        .catch((error) => {
          // Log the error if needed
          console.error("Error checking subscription:", error);
          return error.statusCode === 410; // Check if the subscription is no longer valid
        });
    });

    try {
      await Promise.all(
        subscriptions.map((sub) =>
          webPush.sendNotification(sub, JSON.stringify(notificationPayload))
        )
      );
      res.status(200).json({ message: "Notification sent successfully." });
    } catch (error) {
      console.error("Error sending notification:", error);
      res.status(500).json({ error: "Failed to send notification." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
