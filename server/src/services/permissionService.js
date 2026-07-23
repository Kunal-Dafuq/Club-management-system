const prisma = require("../config/prisma");

const getMembership = async (userId, clubId) => {
    if (!userId || !clubId) return null;
    
    return prisma.membership.findFirst({
        where: {
            userId: Number(userId),
            clubId: Number(clubId),
            status: "APPROVED"
        }
    });
};

const canManageCommittee = async (userId, committeeId) => {
    const parsedCommitteeId = Number(committeeId);
    if (!parsedCommitteeId || isNaN(parsedCommitteeId)) {
        return false;
    }

    const committee = await prisma.committee.findUnique({
        where: {
            id: parsedCommitteeId
        }
    });

    if (!committee) return false;

    const membership = await getMembership(
        userId,
        committee.clubId
    );

    if (!membership) return false;

    if (
        [
            "PRESIDENT",
            "SECRETARY",
            "LEAD"
        ].includes(membership.clubRole)
    ) {
        return true;
    }

    const committeeMember =
        await prisma.committeeMember.findFirst({
            where: {
                committeeId: parsedCommitteeId,
                membershipId: membership.id,
                role: {
                    in: [
                        "HEAD",
                        "COORDINATOR"
                    ]
                }
            }
        });

    return !!committeeMember;
};

const canAssignTasks = canManageCommittee;

const canDeleteCommittee = async (
    userId,
    committeeId
) => {
    const parsedCommitteeId = Number(committeeId);
    if (!parsedCommitteeId || isNaN(parsedCommitteeId)) {
        return false;
    }

    const committee = await prisma.committee.findUnique({
        where: {
            id: parsedCommitteeId
        }
    });

    if (!committee) return false;

    const membership = await getMembership(
        userId,
        committee.clubId
    );

    if (!membership) return false;
    return membership.clubRole === "PRESIDENT";
};

module.exports = {
    getMembership,
    canManageCommittee,
    canAssignTasks,
    canDeleteCommittee
};