const { z } = require("zod");

const eventSchema = z
    .object({
        title: z.string().min(3),
        description: z.string().optional(),
        startTime: z.coerce.date(),
        endTime: z.coerce.date(),
        location: z.string().optional(),
        visibility: z.coerce.boolean(),
        clubId: z.coerce.number()
    })
    .refine(
        (data) => data.endTime > data.startTime,
        {
        message: "End time must be after start time",
        path: ["endTime"]
        }
    );

const updateEventSchema = z.object({
    title: z.string().min(3).optional(),
    description: z.string().optional(),
    startTime: z.coerce.date().optional(),
    endTime: z.coerce.date().optional(),
    location: z.string().optional(),
    visibility: z.boolean().optional(),
    clubId: z.number().optional()
});

module.exports = {
    eventSchema,
    updateEventSchema
};