const { google } = require("googleapis");
const oauth2Client = require("../config/googleOAuth");

const getCalendar = (accessToken) => {
    oauth2Client.setCredentials({
        access_token: accessToken
    });

    return google.calendar({
        version: "v3",
        auth: oauth2Client
    });
};

const createMeetEvent = async ({
    accessToken,
    title,
    description,
    startTime,
    endTime,
    attendees = []
}) => {
    const calendar = getCalendar(accessToken);

    const response = await calendar.events.insert({
        calendarId: "primary",
        conferenceDataVersion: 1,
        requestBody: {
            summary: title,
            description,
            start:{
                dateTime:startTime
            },
            end:{
                dateTime:endTime
            },
            attendees,
            conferenceData:{
                createRequest:{
                    requestId:Date.now().toString(),
                    conferenceSolutionKey:{
                        type:"hangoutsMeet"
                    }
                }
            }
        }
    });

    return response.data;
};

const updateCalendarEvent = async ({
    accessToken,
    eventId,
    title,
    description,
    startTime,
    endTime,
    attendees=[]
})=>{
    const calendar=getCalendar(accessToken);

    return calendar.events.patch({
        calendarId:"primary",
        eventId,
        requestBody:{
            summary:title,
            description,
            start:{dateTime:startTime},
            end:{dateTime:endTime},
            attendees
        }
    });
};

const deleteCalendarEvent = async ({eventId,auth}) => {
    const calendar = google.calendar({
        version: "v3",
        auth
    });

    await calendar.events.delete({
        calendarId: "primary",
        eventId
    });
};

const getCalendarEvent = async ({eventId,auth}) => {
    const calendar = google.calendar({
        version: "v3",
        auth
    });

    const response = await calendar.events.get({
        calendarId: "primary",
        eventId
    });

    return response.data;
};

const listUpcomingEvents = async ({auth,maxResults = 20}) => {
    const calendar = google.calendar({
        version: "v3",
        auth
    });

    const response = await calendar.events.list({
        calendarId: "primary",
        singleEvents: true,
        orderBy: "startTime",
        maxResults,
        timeMin: new Date().toISOString()
    });

    return response.data.items;

};

module.exports={
    createMeetEvent,
    updateCalendarEvent,
    deleteCalendarEvent,
    getCalendarEvent,
    listUpcomingEvents
};