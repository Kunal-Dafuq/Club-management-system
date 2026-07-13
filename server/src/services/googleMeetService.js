const {google}=require("googleapis");

const calendar=google.calendar("v3");
const createMeet=async(auth,data)=>{
    const event=await calendar.events.insert({
        calendarId:"primary",
        conferenceDataVersion:1,
        auth,
        requestBody:{
            summary:data.title,
            description:data.description,
            start:{
                dateTime:data.startTime
            },
            end:{
                dateTime:data.endTime
            },
            conferenceData:{
                createRequest:{
                    requestId:Date.now().toString()
                }
            }
        }
    });

    return event.data.hangoutLink;
};

module.exports={
    createMeet
};