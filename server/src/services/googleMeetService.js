const { google } = require("googleapis");
const crypto = require("crypto");

const { getAuthenticatedClient } = require("../utils/googleToken");
const ApiError = require("../utils/ApiError");

const DEFAULT_TIMEZONE = "Asia/Kolkata";

const buildCalendar = async (userId) => {

    if (!userId) {
        throw new ApiError(
            401,
            "Google account not connected."
        );
    }

    const auth = await getAuthenticatedClient(userId);

    return google.calendar({
        version: "v3",
        auth
    });
};

const createGoogleMeet = async ({
    userId,
    title,
    description = "",
    startTime,
    endTime,
    attendees = []
}) => {
    if (!title || !startTime || !endTime) {
        throw new ApiError(
            400,
            "Meeting title, start time and end time are required."
        );
    }

    if (new Date(startTime) >= new Date(endTime)) {
        throw new ApiError(
            400,
            "End time must be after start time."
        );
    }

    try {
        const calendar = await buildCalendar(userId);

        const { data } = await calendar.events.insert({
            calendarId: "primary",
            conferenceDataVersion: 1,
            sendUpdates: "all",
            requestBody: {
                summary: title,
                description,
                visibility: "default",
                guestsCanInviteOthers: false,
                guestsCanModify: false,
                guestsCanSeeOtherGuests: true,
                start: {
                    dateTime: startTime,
                    timeZone: DEFAULT_TIMEZONE
                },
                end: {
                    dateTime: endTime,
                    timeZone: DEFAULT_TIMEZONE
                },
                attendees,
                reminders: {
                    useDefault: false,
                    overrides: [
                        {
                            method: "email",
                            minutes: 30
                        },
                        {
                            method: "popup",
                            minutes: 10
                        }
                    ]
                },
                conferenceData: {
                    createRequest: {
                        requestId: crypto.randomUUID(),
                        conferenceSolutionKey: {
                            type: "hangoutsMeet"
                        }
                    }
                }
            }
        });

        return {
            calendarEventId: data.id,
            meetUrl: data.hangoutLink,
            htmlLink: data.htmlLink,
            status: data.status
        };
    }

    catch (err) {
        throw new ApiError(
            500,
            err.message || "Unable to create Google Meet."
        );
    }
};

const updateGoogleMeet = async ({
    userId,
    calendarEventId,
    title,
    description = "",
    startTime,
    endTime,
    attendees = []
}) => {
    if (!calendarEventId) {
        throw new ApiError(
            400,
            "Calendar Event ID is required."
        );
    }

    try {
        const calendar = await buildCalendar(userId);

        const { data } = await calendar.events.update({
            calendarId: "primary",
            eventId: calendarEventId,
            conferenceDataVersion: 1,
            sendUpdates: "all",
            requestBody: {
                summary: title,
                description,
                start: {
                    dateTime: startTime,
                    timeZone: DEFAULT_TIMEZONE
                },
                end: {
                    dateTime: endTime,
                    timeZone: DEFAULT_TIMEZONE
                },
                attendees
            }
        });

        return {
            calendarEventId: data.id,
            meetUrl: data.hangoutLink,
            htmlLink: data.htmlLink,
            status: data.status
        };
    }

    catch (err) {
        throw new ApiError(
            500,
            err.message || "Unable to update Google Meet."
        );
    }
};

const deleteGoogleMeet = async ({userId,calendarEventId}) => {
    if (!calendarEventId) {
        throw new ApiError(
            400,
            "Calendar Event ID is required."
        );
    }

    try {
        const calendar = await buildCalendar(userId);
        await calendar.events.delete({
            calendarId: "primary",
            eventId: calendarEventId,
            sendUpdates: "all"
        });

        return {
            success: true
        };
    }

    catch (err) {
        throw new ApiError(
            500,
            err.message || "Unable to delete Google Meet."
        );
    }
};

module.exports = {
    createGoogleMeet,
    updateGoogleMeet,
    deleteGoogleMeet
};