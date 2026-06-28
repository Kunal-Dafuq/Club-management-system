const prisma = require("../config/prisma");

const createActivity = async ({
    clubId,
    userId,
    action,
    description
}) => {

    return prisma.activity.create({

        data:{
            clubId,
            userId,
            action,
            description
        }

    });

};

module.exports={
    createActivity
};