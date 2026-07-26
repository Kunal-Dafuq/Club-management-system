import { getClubs } from "../../clubs/services/clubService";
import { getEvents } from "../../events/services/eventService";
import { getNotifications } from "../../notifications/services/notificationService";
import { getMyRsvps } from "../../events/services/rsvpService";

export const getDashboardData = async () => {
    const [clubsRes, eventsRes, notificationsRes, rsvpsRes] = await Promise.all([
        getClubs(),
        getEvents(),
        getNotifications(),
        getMyRsvps(),
    ]);

    return {
        success: clubsRes.success && eventsRes.success && notificationsRes.success && rsvpsRes.success,
        data: {
            clubs: clubsRes.data || [],
            events: eventsRes.data || [],
            notifications: notificationsRes.data || [],
            rsvps: rsvpsRes.data || [],
        },
        error: clubsRes.error || eventsRes.error || notificationsRes.error || rsvpsRes.error || null,
    };
};