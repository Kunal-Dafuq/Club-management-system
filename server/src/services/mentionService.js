const prisma = require("../config/prisma");

exports.extractMentions = async (content, messageId) => {
    const matches = [...content.matchAll(/@(\w+)/g)];

    for(const m of matches){
        const username = m[1];
        const user = await prisma.user.findFirst({
            where:{
                username
            }
        });

        if(user){
            await prisma.mention.create({
                data:{
                    messageId,
                    userId:user.id
                }
            });
        }
    }
}