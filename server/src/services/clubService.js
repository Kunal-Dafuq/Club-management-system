const prisma = require("../config/prisma");

const generateSlug = async (name) => {
    let baseSlug = name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

    let slug = baseSlug;
    let counter = 1;

    while (await prisma.club.findUnique({ where: { slug } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return slug;
};

module.exports = {
    generateSlug
};