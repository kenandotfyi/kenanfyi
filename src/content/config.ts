import { z, defineCollection } from "astro:content";

const articlesCollection = defineCollection({
  type: "content",
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    pubDate: z.date(),
    updated: z.any(),
    status: z.string(),
    description: z.string(),
    type: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  articles: articlesCollection,
};
