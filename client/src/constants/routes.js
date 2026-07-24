export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    DASHBOARD: "/dashboard",
    CLUBS: "/clubs",
    CLUB_DETAILS: (id = ":id") => `/clubs/${id}`,
    CLUB_PROFILE: (id = ":id") => `/club-profile/${id}`,
    EVENTS: "/events",
    CREATE_EVENT: "/create-event",
    NOTIFICATIONS: "/notifications",
    PROFILE: "/profile",
    PINNED_MESSAGES: (roomId = ":roomId") => `/chat/${roomId}/pins`,
    MEETINGS_UPLOAD: "/meetings/upload",
    MEETINGS_RECORD: "/meetings/record"
};