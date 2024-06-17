import fs from "fs";
import path from "path";

const subscriptionsFilePath = path.resolve("public/data", "subscriptions.json");

export function saveSubscription(subscription: any) {
  const subscriptions = loadSubscriptions();
  subscriptions.push(subscription);
  fs.writeFileSync(
    subscriptionsFilePath,
    JSON.stringify(subscriptions, null, 2)
  );
}

export function loadSubscriptions(): any[] {
  try {
    const fileContent = fs.readFileSync(subscriptionsFilePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
}

export function subscriptionExists(newSubscription: any): boolean {
  const subscriptions = loadSubscriptions();
  return subscriptions.some((sub) => {
    // Example comparison, adjust based on your subscription structure
    return sub.endpoint === newSubscription.endpoint;
  });
}

export function removeSubscriptions(invalidSubscriptions: any[]) {
  const currentSubscriptions = loadSubscriptions();
  const updatedSubscriptions = currentSubscriptions.filter(
    (sub) =>
      !invalidSubscriptions.some(
        (invalidSub) => sub.endpoint === invalidSub.endpoint
      )
  );
  fs.writeFileSync(
    subscriptionsFilePath,
    JSON.stringify(updatedSubscriptions, null, 2)
  );
}
