import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const manifesto = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/manifesto" }),
  schema: z.object({
    number: z.number(),
    title: z.string(),
    lightBg: z.string().optional(),
    lightFg: z.string().optional(),
    darkBg: z.string().optional(),
    darkFg: z.string().optional(),
  }),
});

export const collections = { manifesto };
