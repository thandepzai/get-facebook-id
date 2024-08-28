"use client"
import { useEffect } from 'react';

// Khai báo kiểu cho FB nếu chưa có
declare global {
  interface Window {
    FB: any;
    fbAsyncInit?: () => void;
  }
}

const FacebookDialogs: React.FC = () => {
  useEffect(() => {
    // Load the Facebook SDK asynchronously
    const loadFBSDK = () => {
      if (window.FB) return; // FB SDK already loaded

      window.fbAsyncInit = function() {
        window.FB.init({
          appId: 'YOUR_APP_ID', // Thay thế bằng app ID của bạn
          cookie: true,
          xfbml: true,
          version: 'v13.0' // Sử dụng phiên bản mới nhất hoặc phiên bản bạn muốn
        });
      };

      (function(d: Document, s: string, id: string) {
        let js: HTMLScriptElement | null = d.getElementById(id) as HTMLScriptElement;
        if (js) return;
        js = d.createElement(s) as HTMLScriptElement;
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        
        const fjs = d.getElementsByTagName(s)[0];
        if (fjs && fjs.parentNode) {
          fjs.parentNode.insertBefore(js, fjs);
        }
      }(document, 'script', 'facebook-jssdk'));
    };

    loadFBSDK();
  }, []);

  const handleShareClick = () => {
    if (window.FB) {
      window.FB.ui({
        hashtag: '#thandepzai',
        display: 'popup',
        method: 'share',
        href: 'https://new-url.example.com/share', // Cập nhật URL mới
      }, (response: any) => {
        // Xử lý phản hồi nếu cần
        console.log('Share Dialog Response', response);
      });
    }
  };

  return (
    <div>
      <h3>Sharing Links</h3>
      <button onClick={handleShareClick}>Share Dialog</button>
    </div>
  );
};

export default FacebookDialogs;
