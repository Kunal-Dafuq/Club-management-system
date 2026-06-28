import api from "../api/axios";

export const joinClub = (clubId) =>
    api.post(`/memberships/clubs/${clubId}/join`);

export const leaveClub = (clubId) =>
    api.delete(`/memberships/clubs/${clubId}/leave`);

export const getMyClubs = () =>
    api.get("/memberships/my-clubs");

export const getClubMembers = (clubId) =>
    api.get(`/memberships/clubs/${clubId}/members`);

export const getPendingRequests = (clubId) =>
    api.get(`/memberships/club/${clubId}/pending`);

export const approveMember = (membershipId) =>
    api.put(`/memberships/${membershipId}/approve`);

export const rejectMember = (membershipId) =>
    api.put(`/memberships/${membershipId}/reject`);

export const promoteMember = (membershipId, clubRole) =>
    api.put(`/memberships/${membershipId}/promote`, {clubRole});

export const getPendingRequests = (clubId) =>
    api.get(`/memberships/clubs/${clubId}/pending`);

export const approveMember = (membershipId) =>
    api.put(`/memberships/${membershipId}/approve`);

export const rejectMember = (membershipId) =>
    api.put(`/memberships/${membershipId}/reject`);

export const getClubAnalytics = (clubId)=>
    api.get(`/membership/club/${clubId}/analytics`);