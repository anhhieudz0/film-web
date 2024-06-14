// service-worker.js

self.addEventListener('push', event => {
  const data = event.data.json();
  const options = {
    body: data.body,
    // add more options as needed
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
