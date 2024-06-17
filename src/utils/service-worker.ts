export const registerServiceWorker = async () => {
  return navigator.serviceWorker.register("/service.js");
};

export const unregisterServiceWorkers = async () => {
  const registrations = await navigator.serviceWorker.getRegistrations();
  console.log("Removing registrations");
  await Promise.all(registrations.map((r) => r.unregister()));
};

export const resetServiceWorker = async () => {
  await unregisterServiceWorkers();
  console.log("Resetting service worker");
  return registerServiceWorker();
};
