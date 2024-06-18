import { NextApiRequest, NextApiResponse } from "next";
import webPush from "web-push";
import { loadSubscriptions, removeSubscriptions } from "@/utils/subscriptions";
import { VAPIDKeys } from "@/utils/vapidKeys"; // Assuming you store VAPID keys securely
import { Pool } from 'pg';

// Configure web-push with VAPID keys
const vapidKeys = VAPIDKeys; // Import your VAPID keys securely
webPush.setVapidDetails(
  "mailto:manhhieua1@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
const pool = new Pool({
  connectionString: 'postgres://default:ay1Li7QKuCcI@ep-twilight-wave-a1sx6rxd.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require',
  ssl: {
      rejectUnauthorized: false,
  },
});

type Subscription = {
  endpoint: string;
  expirationTime: string | null;
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

  const client = await pool.connect();
  const result = await client.query<any>('SELECT endpoint, expiration_time as "expirationTime", p256dh, auth FROM subscriptions');
  client.release();
  const subscriptions: Subscription[] = result.rows.map((row:any) => ({
    endpoint: row.endpoint,
    expirationTime: row.expirationTime,
    keys: {
        p256dh: row.p256dh,
        auth: row.auth
    }
}));

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
