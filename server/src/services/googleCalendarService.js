const { google } = require("googleapis");
const oauth2Client = require("../config/googleOAuth");

const createMeetEvent = async ({
    accessToken,
    title,
    description,
    startTime,
    endTime,
    attendees = []
}) => {
    oauth2Client.setCredentials({
        access_token: accessToken
    });

    const calendar = google.calendar({
        version: "v3",
        auth: oauth2Client
    });

    const response = await calendar.events.insert({
        calendarId: "primary",
        conferenceDataVersion: 1,

        requestBody: {
            summary: title,
            description,
            start: {

                dateTime: startTime
            },

            end: {

                dateTime: endTime
            },

            attendees,
            conferenceData: {
                createRequest: {
                    requestId:
                        Date.now().toString(),

                    conferenceSolutionKey: {
                        type: "hangoutsMeet"
                    }
                }
            }
        }
    });

    return response.data;
};

module.exports = {
    createMeetEvent
};