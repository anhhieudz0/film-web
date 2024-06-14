import { NextApiRequest, NextApiResponse } from "next";
import { saveSubscription, subscriptionExists } from "@/utils/subscriptions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const subscription = req.body;
      if (subscriptionExists(subscription)) {
        return res.status(201).json({ error: "Subscription already exists." });
      }
      saveSubscription(subscription);
      res.status(201).json({});
    } catch (error) {
      console.error("Error saving subscription:", error);
      res.status(500).json({ error: "Failed to save subscription." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
