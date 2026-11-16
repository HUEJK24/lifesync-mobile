const { z } = require('zod');

const idParam = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) }),
  body: z.object({}).optional().default({}),
  query: z.object({}).optional().default({}),
});

const allergySchema = z.object({
  body: z.object({
    allergen: z.string().min(1),
    severity: z.string().optional().nullable(),
    reaction: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
  }),
  params: z.object({}).optional().default({}),
  query: z.object({}).optional().default({}),
});

const medicationSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    dosage: z.string().optional().nullable(),
    frequency: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
  }),
  params: z.object({}).optional().default({}),
  query: z.object({}).optional().default({}),
});

const allergyUpdateSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) }),
  body: allergySchema.shape.body,
  query: z.object({}).optional().default({}),
});

const medicationUpdateSchema = z.object({
  params: z.object({ id: z.string().regex(/^\d+$/) }),
  body: medicationSchema.shape.body,
  query: z.object({}).optional().default({}),
});

module.exports = { idParam, allergySchema, medicationSchema, allergyUpdateSchema, medicationUpdateSchema };
