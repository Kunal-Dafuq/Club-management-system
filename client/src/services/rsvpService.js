import api from "../api/axios";

export const createRsvp=(data)=>
api.post("/rsvps",data);

export const getMyRsvps=()=>
api.get("/rsvps");