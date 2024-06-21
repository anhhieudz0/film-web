import { Button } from "antd";
import React, { useState, useEffect } from "react";
import { BsChevronDoubleUp } from "react-icons/bs";

const GoToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <>
      {isVisible && (
        <Button
          type="primary"
          shape="circle"
          size="large"
          onClick={scrollToTop}
          className="!fixed !right-5 bottom-10 z-[99999] w-10 h-10 flex items-center justify-center shadow-md"
        >
          <BsChevronDoubleUp size={20} className="font-semibold" />
        </Button>
      )}
    </>
  );
};

export default GoToTopButton;
