import React, { useMemo, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import GoToTopButton from "../common/GoToTopBtn";
const HEADER_HEIGHT = 64;
const FOOTER_HEIGHT = 200;

const Layout = ({ children }: React.PropsWithChildren) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const bodyMinHeight = useMemo(() => {
    if (headerRef.current && footerRef.current) {
      return (
        window.innerHeight -
        headerRef.current?.clientHeight -
        footerRef.current?.clientHeight -
        20
      );
    }
    return 0;
  }, [headerRef.current, footerRef.current]);
  return (
    <div>
      <div
        style={{ width: "100%" }}
        className="!sticky !top-0 !left-0 !right-0 !z-50"
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
