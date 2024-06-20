// pages/api/subscriptions.ts

import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    "postgres://default:ay1Li7QKuCcI@ep-twilight-wave-a1sx6rxd.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require",
  ssl: {
    rejectUnauthorized: false,
  },
});

interface Subscription {
  endpoint: string;
  expirationTime: string | null;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { endpoint, expirationTime, keys }: Subscription = req.body;

    if (!endpoint || !keys || !keys.p256dh || !keys.auth) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const client = await pool.connect();

      // Check if the subscription already exists
      const checkQuery = "SELECT * FROM subscriptions WHERE endpoint = $1";
      const checkResult = await client.query(checkQuery, [endpoint]);

      if (checkResult.rows.length > 0) {
        client.release();
        return res.status(409).json({ error: "Subscription already exists" });
      }

      // Insert the new subscription
      const insertQuery = `
                INSERT INTO subscriptions (endpoint, expiration_time, p256dh, auth)
                VALUES ($1, $2, $3, $4)
                RETURNING *;
            `;
      const values = [endpoint, expirationTime, keys.p256dh, keys.auth];
      const insertResult = await client.query(insertQuery, values);
      client.release();

      res.status(201).json(insertResult.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
