import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import themeCustom from "../theme/themeConfig";
import Layout from "@/components/layout";

const App = ({ Component, pageProps }: AppProps) => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

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
