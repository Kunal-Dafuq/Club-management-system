const ai = require("../ai/ollamaService");

const generateMeetingSummary = async (transcript) => {

    if (!transcript?.trim()) {
        throw new Error("Transcript cannot be empty.");
    }

    const prompt = `You are an expert meeting assistant.

    Return ONLY valid JSON.

    {
        "summary":"",
        "discussionPoints":[],
        "decisions":[],
        "actionItems":[
            {
                "task":"",
                "owner":"",
                "deadline":""
            }
        ],
        "nextSteps":[]
    }

    Transcript:

    ${transcript}
    `;

    const summary = await ai.generateJson(prompt);

    return {
        summary: summary.summary || "",
        discussionPoints: summary.discussionPoints || [],
        decisions: summary.decisions || [],
        actionItems: summary.actionItems || [],
        nextSteps: summary.nextSteps || []
    };
};

module.exports = {
    generateMeetingSummary
};