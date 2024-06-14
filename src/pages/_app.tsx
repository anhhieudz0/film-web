import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import themeCustom from "../theme/themeConfig";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import SplashScreen from "@/components/common/SplashScreen";

const App = ({ Component, pageProps }: AppProps) => {
  const [domLoaded, setDomLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    if (router && window) setTimeout(() => window.scrollTo({ top: 0 }), 0);
  }, [router]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker registration successful:", registration);
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
    }
  }, []);

  useEffect(() => {
    async function subscribeToNotifications() {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        try {
          const registration = await navigator.serviceWorker.ready;
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: "your-application-server-key",
          });

          await fetch("/api/subscribe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(subscription),
          });

          console.log("Subscribed to push notifications.");
        } catch (error) {
          console.error("Failed to subscribe:", error);
        }
      } else {
        console.warn("Push messaging is not supported.");
      }
    }
    subscribeToNotifications();
  }, []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);
  // if (isLoading && router.pathname === "/") {
  //   return <SplashScreen />;
  // }
  return (
    <>
      {domLoaded && (
        <ConfigProvider theme={{ ...themeCustom }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ConfigProvider>
      )}
    </>
  );
};

export default App;
