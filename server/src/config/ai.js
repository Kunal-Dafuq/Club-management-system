module.exports = {
    host:
        process.env.OLLAMA_HOST ||
        "http://127.0.0.1:11434",

    model:
        process.env.OLLAMA_MODEL ||
        "qwen2.5:3b",

    temperature:0.2,

    contextWindow:4096
};