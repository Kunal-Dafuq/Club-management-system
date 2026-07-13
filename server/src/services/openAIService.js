const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const summarizeMeeting = async (
    transcript
) => {
    const response = await client.chat.completions.create({
        model: "gpt-4.1-mini",

        messages: [

            {
                role: "system",

                content:
                `
                You are an expert meeting assistant.

                Return ONLY JSON.

                {
                "summary":"",
                "actionItems":[],
                "decisions":[],
                "nextSteps":[]
                }
                `
            },

            {
                role: "user",
                content: transcript
            }
        ],

        temperature:0.2

    });

    return JSON.parse(
        response.choices[0]
            .message.content
    );
};

module.exports={
    summarizeMeeting
};