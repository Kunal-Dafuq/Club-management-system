const prisma = require("../config/prisma");

const { searchMessages } = require("../services/searchService");

const search = async (req, res) => {

    const messages = await searchMessages(
        Number(req.params.roomId),
        req.query.q
    );

    res.json(messages);

};

module.exports = {
    search
};