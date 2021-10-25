function urlBase64ToUnit8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

const publicVapidKey =
  "BNaH2lMPKv8fzJu_qTmIn9so4iF0ErYhygQnPx1Vg4TncAqzztikPrsZIr2gXU3xmwzCJjDK2irc3u8o48iMjVg";

const triggerPush = document.querySelector(".trigger-push");

async function triggerPushNotification() {
  if ("serviceWorker" in navigator) {
    const register = await navigator.serviceWorker.register("./sw.js", {
      scope: "/",
    });

    console.log("waiting for acceptance");
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUnit8Array(publicVapidKey),
    });

    console.log("Acceptance completed");
    await fetch("/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    console.error("Service workers are not supported in this browser");
  }
}

triggerPush.addEventListener("click", () => {
  triggerPushNotification().catch((error) => console.error(error));
});
