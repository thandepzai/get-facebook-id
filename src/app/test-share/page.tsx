// pages/facebook-dialogs.js
"use client"
import { useEffect } from "react";

const FacebookDialogs = () => {
  useEffect(() => {
    // Load the Facebook SDK asynchronously
    const loadFBSDK = () => {
      if (window.FB) return; // FB SDK already loaded

      window.fbAsyncInit = function () {
        window.FB.init({
          appId: "YOUR_APP_ID", // Replace with your app ID
          cookie: true,
          xfbml: true,
          version: "v13.0", // Use the latest version or your preferred version
        });
      };

      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    };

    loadFBSDK();
  }, []);

  const handleShareClick = () => {
    window.FB.ui(
      {
        hashtag: "#thandepzai",
        display: "popup",
        method: "share",
        href: "https://get-facebook-id.vercel.app/facebook?title=Ch%C3%BAc%20m%E1%BB%ABng%20b%E1%BA%A1n%20th%C3%A2n&images=https://mapstudy.sgp1.digitaloceanspaces.com/course/mog9q0t00fet/khoa-o---thuc-chien-luyen-de-vat-ly-nam-2025-1709626156064.jpg",
      },
      function (response) {}
    );
  };

  const handleOGClick = () => {
    window.FB.ui(
      {
        display: "popup",
        method: "share_open_graph",
        action_type: "og.likes",
        action_properties: JSON.stringify({
          object: "https://developers.facebook.com/docs/",
        }),
      },
      function (response) {}
    );
  };

  const handleRequestsClick = () => {
    window.FB.ui(
      {
        method: "apprequests",
        message: "This is a test message for the requests dialog.",
      },
      function (data) {
        console.log("App Requests Response", data);
      }
    );
  };

  return (
    <div>
      <h1>Sharing using FB.ui() Dialogs</h1>
      <p>
        Below are some simple examples of how to use UI dialogs in a web page.
      </p>

      <h3>Sharing Links</h3>
      <button onClick={handleShareClick}>Share Dialog</button>
      <p>
        The Share Dialog enables you to share links to a person's profile
        without them having to use Facebook Login.
        <a href="https://developers.facebook.com/docs/sharing/reference/share-dialog">
          Read our Share Dialog guide
        </a>
        to learn more about how it works.
      </p>

      <h3>Publishing Open Graph Stories</h3>
      <p>
        The Share Dialog can also be used to publish Open Graph stories without
        using Facebook Login or the Graph API.
        <a href="https://developers.facebook.com/docs/sharing/reference/share-dialog">
          Read our Share Dialog guide
        </a>
        to learn more about how it works.
      </p>
      <button onClick={handleOGClick}>Simple OG Dialog</button>

      <h3>Sending App Requests</h3>
      <p>
        <a href="https://developers.facebook.com/docs/games/requests/">
          Requests
        </a>{" "}
        can be sent by any Facebook Apps that are categorised as Games and have
        a Canvas, iOS, or Android implementation. The JavaScript SDK enables web
        Canvas games to send requests.
        <a href="https://developers.facebook.com/docs/games/requests/">
          Read our guide to Requests
        </a>{" "}
        to learn more and see more complex examples that you could use.
      </p>
      <button onClick={handleRequestsClick}>Basic Request Dialog</button>
    </div>
  );
};

export default FacebookDialogs;
