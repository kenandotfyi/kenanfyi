import { z, defineCollection } from "astro:content";

const articlesCollection = defineCollection({
  type: "content",
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    pubDate: z.coerce.date(),
    updated: z.coerce.date(),
    status: z.string(),
    description: z.string(),
    backlinks: z.array(z.string()),
    forwards: z.array(z.string()),
    type: z.string(),
    tags: z.array(z.string()),
  }),
});

const bitsCollection = defineCollection({
  type: "content",
  schema: z.object({
    pubDate: z.coerce.date(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  articles: articlesCollection,
  bits: bitsCollection,
};
