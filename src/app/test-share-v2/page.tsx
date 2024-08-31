"use client";
import { useEffect } from "react";
import type { NextPage } from "next";

declare global {
  interface Window {
    FB: any;
  }
}

// Component để chia sẻ lên Facebook
const FacebookShareButton = () => {
  useEffect(() => {
    // Load Facebook SDK script
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "1559858418286492", // Thay thế bằng appId của bạn
          autoLogAppEvents: true,
          xfbml: true,
          version: "v16.0",
        });
      };
    };

    return () => {
      // Clean up the script
      document.body.removeChild(script);
    };
  }, []);

  const handleShare = () => {
    if (window.FB) {
      window.FB.ui(
        {
          display: "popup",
          method: "share_open_graph",
          action_type: "og.likes",
          action_properties: JSON.stringify({
            object: "https://mapstudy.edu.vn/",
          }),
        },
        (response: any) => {
          console.log("Share response:", response);
        }
      );
    } else {
      console.error("Facebook SDK not loaded.");
    }
  };

  return (
    <button id="ogBtn" onClick={handleShare}>
      Share on Facebook
    </button>
  );
};

// Trang chính
const Home: NextPage = () => {
  return (
    <div>
      <h1>Welcome to My Website</h1>
      <FacebookShareButton />
    </div>
  );
};

export default Home;
