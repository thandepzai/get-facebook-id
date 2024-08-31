"use client";
import React, { useEffect } from "react";
import { loadFacebookSDK } from "./facebook-sdk";

interface FacebookShareButtonProps {
  appId: string;
  href: string;
}

const FacebookShareButton: React.FC<FacebookShareButtonProps> = ({
  appId,
  href,
}) => {
  useEffect(() => {
    loadFacebookSDK(appId);
  }, [appId]);

  const handleShareClick = async () => {
    try {
      if (window.FB && window.FB.init) {
        window.FB.ui(
          {
            display: "popup",
            method: "share_open_graph",
            action_type: "og.likes",
            action_properties: JSON.stringify({
              object: "https://mapstudy.edu.vn/", // URL bạn muốn chia sẻ
            }),
          },
          (response: any) => {
            console.log("Response:", response);
            if (response && !response.error_code) {
              if (response.post_id) {
                console.log(
                  "Chia sẻ thành công với post_id: " + response.post_id
                );
              } else {
                console.log("Chia sẻ đã bị hủy.");
              }
            } else {
              console.log(
                "Có lỗi xảy ra khi chia sẻ:",
                response.error_message || "Không có thông báo lỗi."
              );
            }
          }
        );
      } else {
        console.error("Facebook SDK chưa được khởi tạo.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleShareClick}>Chia sẻ lên Facebook</button>;
};

export default FacebookShareButton;
