import React from "react";

import HomeTemplate from "@/components/Templates/Home";
import { NextPage } from "next";
import dynamic from "next/dynamic";
const Notifications = dynamic(
  () => import("@/components/common/notifications"),
  {
    ssr: false, // Make sure to render component client side to access window and Notification API's
  }
);
const Home: NextPage = () => {
  return (
    <>
      <Notifications />
      <HomeTemplate />
    </>
  );
};

export default Home;
