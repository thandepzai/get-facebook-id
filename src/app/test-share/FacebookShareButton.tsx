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

  const checkLoginStatus = () => {
    return new Promise((resolve, reject) => {
      window.FB.getLoginStatus((response: any) => {
        if (response.status === "connected") {
          resolve(response);
        } else {
          reject("Người dùng chưa đăng nhập.");
        }
      });
    });
  };

  const handleShareClick = async () => {
    try {
      await checkLoginStatus();
      if (window.FB) {
        window.FB.ui(
          {
            method: "share",
            href: href,
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
