"use client";
// ShareButton.tsx
import React, { useEffect } from 'react';
import { useFacebookSdk } from './useFacebookSdk';

const ShareButton: React.FC = () => {
  const appId = 'YOUR_APP_ID'; // Thay 'YOUR_APP_ID' bằng ID ứng dụng của bạn

  useFacebookSdk(appId);

  useEffect(() => {
    // Đảm bảo rằng FB SDK đã được khởi tạo
    if (window.FB) {
      document.getElementById('ogBtn')?.addEventListener('click', () => {
        window.FB.ui({
          display: 'popup',
          method: 'share_open_graph',
          action_type: 'og.likes',
          action_properties: JSON.stringify({
            object: 'https://mapstudy.edu.vn/', // URL bạn muốn chia sẻ
          })
        }, function (response: any) {
          console.log("Response:", response);
        });
      });
    }
  }, []);

  return (
    <button id="ogBtn">
      Chia sẻ trên Facebook
    </button>
  );
};

export default ShareButton;
