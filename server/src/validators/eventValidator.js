const { z } = require("zod");
const eventSchema = z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    location: z.string().optional(),
    visibility: z.string(),
    clubId: z.number()
});

const updateEventSchema = eventSchema.partial();

module.exports = {
    eventSchema,
    updateEventSchema
};
