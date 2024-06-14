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
