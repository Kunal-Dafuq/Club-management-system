import api from "../../../api/axios";
import { handleApi } from "../../../api/handleApi";

export const joinClub = (clubId) =>
    handleApi(() => api.post(`/memberships/clubs/${clubId}/join`));

export const leaveClub = (clubId) =>
    handleApi(() => api.delete(`/memberships/clubs/${clubId}/leave`));

export const getMyClubs = () =>
    handleApi(() => api.get("/memberships/my-clubs"));

export const getClubMembers = (clubId) =>
    handleApi(() => api.get(`/memberships/clubs/${clubId}/members`));

export const getPendingRequests = (clubId) =>
    handleApi(() => api.get(`/memberships/clubs/${clubId}/pending`));

export const approveMember = (membershipId) =>
    handleApi(() => api.put(`/memberships/${membershipId}/approve`));

export const rejectMember = (membershipId) =>
    handleApi(() => api.put(`/memberships/${membershipId}/reject`));

export const promoteMember = (membershipId, clubRole) =>
    handleApi(() => api.put(`/memberships/${membershipId}/promote`, { clubRole }));

export const getClubAnalytics = (clubId) =>
    handleApi(() => api.get(`/membership/club/${clubId}/analytics`));