const prisma = require("../config/prisma");

const createCommittee = async (clubId, data) => {
    const club = await prisma.club.findUnique({
        where:{
            id:clubId
        }
    });

    if(!club){
        throw new Error("Club not found");
    }

    return prisma.committee.create({
        data:{
            name:data.name,
            description:data.description,
            color:data.color,
            icon:data.icon,
            isCore: data.isCore ?? false,
            clubId
        }
    });
};

const getCommitteesByClub = async (clubId) => {
    return prisma.committee.findMany({
        where: {
            clubId,
            deletedAt: null
        },
        include: {
            members: {
                include: {
                    membership: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                    department: true
                                }
                            }
                        }
                    }
                }
            }
        },

        orderBy: {
            createdAt: "asc"
        }
    });
};

const getCommitteeById = async (committeeId) => {
    const committee = await prisma.committee.findUnique({
        where: {
            id: committeeId
        },
        include: {
            members: {
                include: {
                    membership: {
                        include: {
                            user: true
                        }
                    }
                }
            }
        }
    });

    if (!committee) {
        throw new Error("Committee not found");
    }

    return committee;
};

const updateCommittee = async (committeeId, data) => {
    const committee = await prisma.committee.findUnique({
        where: {
            id: committeeId
        }
    });

    if (!committee) {
        throw new Error("Committee not found");
    }

    return prisma.committee.update({
        where: {
            id: committeeId
        },
        data: {
            name: data.name ?? undefined,
            description: data.description ?? undefined,
            color: data.color ?? undefined,
            icon: data.icon ?? undefined,
            isCore: data.isCore ?? undefined
        }
    });
};

const deleteCommittee = async (committeeId) => {
    const committee = await prisma.committee.findUnique({
        where: {
            id: committeeId
        }
    });

    if (!committee) {
        throw new Error("Committee not found");
    }

    return prisma.committee.update({
        where: {
            id: committeeId
        },
        data: {
            deletedAt: new Date()
        }
    });
};

const addMember = async (committeeId, membershipId, role = "MEMBER") => {
    const membership = await validateMembership(membershipId);
    const committee = await validateCommittee(committeeId);

    if (committee.clubId !== membership.clubId) {
        throw new Error("Committee and member belong to different clubs");
    }

    const existing = await prisma.committeeMember.findFirst({
        where: {
            committeeId,
            membershipId
        }
    });

    if (existing) {
        throw new Error("Already a committee member");
    }

    return prisma.committeeMember.create({

        data: {
            committeeId,
            membershipId,
            role
        },

        include: {
            membership: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            department: true
                        }
                    }
                }
            }
        }
    });
};

const removeMember = async (committeeId, membershipId) => {
    const member = await prisma.committeeMember.findUnique({
        where: {
            committeeId_membershipId: {
                committeeId,
                membershipId
            }
        }
    });

    if (!member) {
        throw new Error("Committee member not found");
    }

    return prisma.committeeMember.delete({
        where: {
            committeeId_membershipId: {
                committeeId,
                membershipId
            }
        }
    });
};

const updateCommitteeRole = async (committeeMemberId, role) => {
    const member = await prisma.committeeMember.findUnique({
        where: {
            id: committeeMemberId
        }
    });

    if (!member) {
        throw new Error("Committee member not found");
    }

    return prisma.committeeMember.update({
        where: {
            id: committeeMemberId
        },
        data: {
            role
        }
    });
};

const restoreCommittee = async (committeeId) => {
    const committee = await prisma.committee.findUnique({
        where: {
            id: committeeId
        }
    });

    if (!committee) {
        throw new Error("Committee not found");
    }

    return prisma.committee.update({
        where: {
            id: committeeId
        },
        data: {
            deletedAt: null
        }
    });
};

const getCommitteeStats = async (committeeId) => {
    const committee = await prisma.committee.findUnique({
        where: {
            id: committeeId
        },
        include: {
            members: true
        }
    });

    if (!committee) {
        throw new Error("Committee not found");
    }

    return {
        totalMembers: committee.members.length,
        heads: committee.members.filter(
            member => member.role === "HEAD"
        ).length,
        coordinators: committee.members.filter(
            member => member.role === "COORDINATOR"
        ).length
    };
};

const validateMembership = async (membershipId) => {
    const membership = await prisma.membership.findUnique({
        where: {
            id: membershipId
        },
        include: {
            club: true,
            user: true
        }
    });

    if (!membership) throw new Error("Membership not found");
    if (membership.status !== "APPROVED") throw new Error("Not approved");

    return membership;
};

const validateCommittee = async (committeeId) => {
    const committee = await prisma.committee.findUnique({
        where: { id: committeeId }
    });

    if (!committee) throw new Error("Committee not found");

    return committee;
};

module.exports = {
    createCommittee,
    getCommitteesByClub,
    getCommitteeById,
    updateCommittee,
    deleteCommittee,
    addMember,
    removeMember,
    restoreCommittee,
    updateCommitteeRole,
    getCommitteeStats
};