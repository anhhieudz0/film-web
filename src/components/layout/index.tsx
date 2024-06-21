import React, { useState, useEffect, useRef, useMemo } from "react";
import Header from "./Header";
import Footer from "./Footer";
import GoToTopButton from "../common/GoToTopBtn";

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const bodyMinHeight = useMemo(() => {
    if (headerRef.current && footerRef.current) {
      return (
        window.innerHeight -
        headerRef.current.clientHeight -
        footerRef.current.clientHeight -
        20
      );
    }
    return 0;
  }, [headerRef.current, footerRef.current]);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    console.log("window.scrollY", window.scrollY);
    const isVisible = prevScrollPos > currentScrollPos;

    setVisible(isVisible);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (isMobile) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [prevScrollPos]);

  return (
    <div>
      <div
        style={{
          width: "100%",
          transition: "top 0.3s",
          top: visible ? "0" : `-${headerRef?.current?.clientHeight}px`,
        }}
        className="!sticky !left-0 !right-0 !z-50"
        ref={headerRef}
      >
        <Header />
      </div>
      <div
        style={{
          width: "100%",
          minHeight: bodyMinHeight,
        }}
      >
        <div className="max-w-[1364px] m-auto">{children}</div>
      </div>
      <div style={{ width: "100%" }} ref={footerRef}>
        <Footer />
      </div>
      <GoToTopButton />
    </div>
  );
};

export default Layout;
