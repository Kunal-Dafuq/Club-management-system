const service = require("../services/meetingPollService");

const createPoll = async (req,res) => {
    try {
        const poll =
            await service.createPoll(
                Number(req.params.id),
                req.user.membershipId,
                req.body
            );
        res.status(201).json(poll);
    }

    catch (err) {
        res.status(400).json({
            message:
                err.message
        });
    }
};

const vote = async (req,res) => {
    const result =
        await service.vote(
            Number(req.params.optionId)
        );
    res.json(result);
};

const getPolls = async (
    req,
    res
) => {
    const polls =
        await service.getPolls(
            Number(req.params.id)
        );
    res.json(polls);
};

module.exports = {
    createPoll,
    vote,
    getPolls
};