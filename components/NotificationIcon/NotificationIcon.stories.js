// components/NotificationIcon/NotificationIcon.stories.js
import NotificationIcon from "./NotificationIcon";
import { notificationData } from "./data"; // Import the data for storybook

export default {
  title: "Components/NotificationIcon",
  component: NotificationIcon,
};

// Default Story
export const Default = () => <NotificationIcon />;

// No Notifications Story
export const NoNotifications = () => (
  <NotificationIcon notificationCount={notificationData.noNotifications} />
);

// High Notifications Story
export const HighNotifications = () => (
  <NotificationIcon notificationCount={notificationData.highCount} />
);
