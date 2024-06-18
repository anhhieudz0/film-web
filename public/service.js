/// <reference lib="webworker" />

self.addEventListener("notificationclick", (event) => {
  event.preventDefault();

  const notificationPayload = event.notification.data;

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then(() => {
        if (clients.openWindow) {
          event.notification.close();
          clients.openWindow(
            notificationPayload?.url ?? `/`,
          );
          return;
        }
      })
  );
});

self.addEventListener("push", (event) => {
  if (!self.Notification || self.Notification.permission !== "granted") {
    console.warn("通知が設定されていません");
    return;
  }

  if (event.data) {
    const data = JSON.parse(event.data.text());

    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        data,
        icon: data.icon
      })
    );
  }
});
