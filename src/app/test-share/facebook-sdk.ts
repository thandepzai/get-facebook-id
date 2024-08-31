// facebook-sdk.ts
declare global {
  interface Window {
    fbAsyncInit?: () => void;
    FB: any;
  }
}

export const loadFacebookSDK = (appId: string) => {
  // Load Facebook SDK
  (function (d, s, id) {
    let js: any,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode?.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");

  // Initialize Facebook SDK
  window.fbAsyncInit = () => {
    window.FB.init({
      appId: appId,
      cookie: true,
      xfbml: true,
      version: "v12.0",
    });
  };
};
