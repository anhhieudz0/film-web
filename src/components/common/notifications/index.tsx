"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { resetServiceWorker } from "@/utils/service-worker";
import styles from "./styles.module.css";
import { Notice } from "./Notice";
import { VAPIDKeys } from "@/utils/vapidKeys";
import { Button, Modal, Typography } from "antd";
import Router from "next/router";

const notificationsSupported = () =>
  typeof window !== "undefined" &&
  "Notification" in window &&
  "serviceWorker" in navigator &&
  "PushManager" in window;

export default function Notifications() {
  const [permission, setPermission] = useState("default" || window.Notification.requestPermission());
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(notificationsSupported);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPermission(window.Notification.permission);
    }
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Render nothing until the component is mounted
  }

  if (!notificationsSupported()) {
    return (
      <Notice message="Please install this app on your home screen first!" />
    );
  }

  const requestPermission = async () => {
    if (!notificationsSupported()) {
      return;
    }

    const receivedPermission = await window.Notification.requestPermission();
    setPermission(receivedPermission);

    if (receivedPermission === "granted") {
      subscribe();
      setIsOpen(false)
    }
  };

  return (
    <>
      {Router.pathname === "/" ? (
        <Modal
          open={isOpen && (permission !== "granted")}
          onClose={() => setIsOpen(false)}
          footer={false}
          title={false}
          className="text-center"
        >
          <Typography>{`Notifications permission status: ${permission}`}</Typography>
          <Button
            type="primary"
            onClick={requestPermission}
            className={styles.Button}
          >
            Request permission and subscribe
          </Button>
        </Modal>
      ) : (
        <>
          <Notice message={`Notifications permission status: ${permission}`} />
          <Button
            type="primary"
            onClick={requestPermission}
            className={styles.Button}
          >
            Request permission and subscribe
          </Button>
        </>
      )}
    </>
  );
}

const saveSubscription = async (subscription: PushSubscription) => {
  const BACKEND_URL = `/api/subscribe`;

  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
  return response.json();
};

const subscribe = async () => {
  const swRegistration = await resetServiceWorker();

  try {
    const options = {
      applicationServerKey: VAPIDKeys.publicKey,
      userVisibleOnly: true,
    };
    const subscription = await swRegistration.pushManager.subscribe(options);

    await saveSubscription(subscription);

    console.log({ subscription });
  } catch (err) {
    console.error("Error", err);
  }
};
