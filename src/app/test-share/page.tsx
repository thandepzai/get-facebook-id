import React from "react";
import FacebookShareButton from "./FacebookShareButton";

const App: React.FC = () => {
  return (
    <div>
      <h1>Chia sẻ nội dung lên Facebook</h1>
      <FacebookShareButton
        appId="145634995501895"
        href="https://developers.facebook.com/docs/"
      />
    </div>
  );
};

export default App;
