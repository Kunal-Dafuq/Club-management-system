const { Ollama } = require("ollama");
const config = require("../config/ai");

const client = new Ollama({
    host: config.host
});

const MODEL =
    process.env.OLLAMA_MODEL ||
    "qwen2.5:3b";

const cleanJson = (text) => {
    if (!text) {
        throw new Error("Empty AI response.");
    }

    return text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
};

const generateMeetingSummary = async (
    transcript
) => {
    if (!transcript?.trim()) {
        throw new Error(
            "Transcript cannot be empty."
        );
    }

    const prompt = `You are an expert meeting assistant.

    Return ONLY valid JSON.

    Schema:

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

    Meeting Transcript:

    ${transcript}
    `;

    const response = await client.chat({
        model: config.model,

        messages: [
            {
                role: "user",
                content: prompt
            }
        ],

        options: {
            temperature: config.temperature,
            num_ctx: config.contextWindow
        }
    });

    try{
        return JSON.parse(
            cleanJson(
                response.message.content
            )
        );

    }catch{
        throw new Error(
            "Invalid JSON returned from Ollama."
        );
    }
};

module.exports = {
    generateMeetingSummary
};