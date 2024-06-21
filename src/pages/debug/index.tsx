"use client";

import Link from "next/link";
import styles from "./styles.module.css";
import {
  resetServiceWorker,
  unregisterServiceWorkers,
} from "@/utils/service-worker";
import dynamic from "next/dynamic";
import { Button } from "antd";

const Notifications = dynamic(
  () => import("@/components/common/notifications"),
  {
    ssr: false, // Make sure to render component client side to access window and Notification API's
  }
);
export default function DebugActions() {
  return (
    <div className=" text-white flex flex-col items-center justify-center min-h-[100vh] gap-5">
      <Notifications />
      <h3 className={styles.heading}>Debug actions</h3>
      <Button type="primary" onClick={resetServiceWorker}>
        Reset SW
      </Button>
      <Button type="primary" onClick={unregisterServiceWorkers}>
        Remove SW
      </Button>
      <h3 className={styles.heading}>Debug Storage</h3>
      <Button type="primary" onClick={() => localStorage.clear()}>
        Remove LocalStorage
      </Button>
      <Button type="primary" onClick={() => sessionStorage.clear()}>
        Remove SessionStorage
      </Button>
      <Link href="/" className="bg-blue-500 px-4 py-1 rounded-md">
        Back to home
      </Link>
    </div>
  );
}
