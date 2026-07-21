const { Ollama } = require("ollama");
const config = require("../config/ai");

const client = new Ollama({
    host: config.host
});

const cleanJson = (content = "") =>
    content
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

const generateJson = async (prompt, maxRetries = 3) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
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

            return JSON.parse(cleanJson(response.message.content));
        } catch (error) {
            console.error(`AI Generation Attempt ${attempt} failed:`, error.message);
            
            if (attempt === maxRetries) {
                throw new Error("AI failed to generate valid response after maximum retries.");
            }
            
            await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
        }
    }
};

module.exports = {
    generateJson
};