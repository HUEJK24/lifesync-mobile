const { z } = require('zod');

const updateProfileSchema = z.object({
  body: z.object({
    blood_type: z.string().max(10).optional().nullable(),
    birth_date: z.string().optional().nullable(),
    notes: z.string().max(1000).optional().nullable(),
  }),
  params: z.object({}).optional().default({}),
  query: z.object({}).optional().default({}),
});

module.exports = { updateProfileSchema };
