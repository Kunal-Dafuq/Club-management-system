export const getClubBySlug = (slug) =>
    api.get(`/clubs/slug/${slug}`);

export const updateBranding = (id, data) =>
    api.patch(`/clubs/${id}/branding`, data);

export const updateSocialLinks = (id, data) =>
    api.patch(`/clubs/${id}/socials`, data);