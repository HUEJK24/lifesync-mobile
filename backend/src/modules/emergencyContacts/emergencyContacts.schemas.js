const { z } = require('zod');

const contactBody = z.object({
  name: z.string().min(1),
  relationship: z.string().optional().nullable(),
  phone: z.string().min(5),
  is_primary: z.boolean().optional(),
});

const createContactSchema = z.object({
  body: contactBody,
  params: z.object({}).optional().default({}),
  query: z.object({}).optional().default({}),
});

const updateContactSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) }),
  body: contactBody,
  query: z.object({}).optional().default({}),
});

module.exports = { createContactSchema, updateContactSchema };
