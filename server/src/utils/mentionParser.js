const extractMentions = (text = "") => {
    return [...text.matchAll(/@(\w+)/g)]
        .map(match => match[1]);
};

module.exports = extractMentions;