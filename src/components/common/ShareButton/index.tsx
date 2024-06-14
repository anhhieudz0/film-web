// components/ShareButton.tsx

import { Button } from "antd";
import React, { useState } from "react";
import { BsShare, BsShareFill } from "react-icons/bs";
interface Props {
  title: string;
  text: string;
}
const ShareButton: React.FC<Props> = (props) => {
  const [shareSupported, setShareSupported] = useState<boolean>(
    typeof navigator.share !== "undefined"
  );

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: props?.title,
          text: props?.text,
          url: window.location.href,
        });
      } catch (error) {}
    } else {
    }
  };

  return (
    <>
      {shareSupported ? (
        <Button
          className="flex items-center gap-1"
          type="primary"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleShare();
          }}
        >
          <BsShareFill /> Chia sẻ
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};

export default ShareButton;
