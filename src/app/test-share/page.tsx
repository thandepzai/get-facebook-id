import React from "react";
import FacebookShareButton from "./FacebookShareButton";

const App: React.FC = () => {
  return (
    <div>
      <h1>Chia sẻ nội dung lên Facebook</h1>
      <FacebookShareButton
        appId="1559858418286492" // Thay thế bằng appId của bạn
        href="https://developers.facebook.com/docs/"
      />
    </div>
  );
};

export default App;
