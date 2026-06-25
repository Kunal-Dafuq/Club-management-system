import { getClubs } from "./clubService";
import { getEvents } from "./eventService";
import { getNotifications } from "./notificationService";
import { getMyRsvps } from "./rsvpService";

export const getDashboardData = async () => {
  const [clubs, events, notifications, rsvps] = await Promise.all([getClubs(), getEvents(), getNotifications(), getMyRsvps()]);
  return {
    clubs: clubs.data,
    events: events.data,
    notifications: notifications.data,
    rsvps: rsvps.data
  };
};