const prisma = require("../config/prisma");

const auditLogger = require("../utils/auditLogger");

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
            isCore:data.isCore || false,
            clubId
        }
    });
};

const getCommitteesByClub = async (clubId) => {
    return prisma.committee.findMany({
        where: {
            clubId
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
    return prisma.committee.findUnique({
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
};

const updateCommittee = async (committeeId, data) => {
    return prisma.committee.update({
        where: {
            id: committeeId
        },
        data
    });
};

const deleteCommittee = async (
    committeeId,
    userId
)=>{
    const committee = await prisma.committee.update({
        where:{
            id:committeeId
        },

        data:{
            deletedAt:new Date()
        }
    });

    await auditLogger(req,{
        action:"COMMITTEE_DELETED",
        entityType:"Committee",
        entityId:committee.id,
        clubId:committee.clubId
    });

    return committee;

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
    return prisma.committeeMember.update({
        where: {
            id: committeeMemberId
        },

        data: {
            role
        }
    });
};

const restoreCommittee = async(
    committeeId
)=>{
    return prisma.committee.update({
        where:{
            id:committeeId
        },
        data:{
            deletedAt:null
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