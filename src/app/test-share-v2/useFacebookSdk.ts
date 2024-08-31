// useFacebookSdk.ts
import { useEffect } from 'react';

export const useFacebookSdk = (appId: string) => {
  useEffect(() => {
    if (window.FB) return;

    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);

    script.onload = () => {
      window.fbAsyncInit = () => {
        window.FB.init({
          appId,
          cookie: true,
          xfbml: true,
          version: 'v16.0',
        });
      };
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [appId]);
};
