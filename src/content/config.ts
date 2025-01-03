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
    backlinks: z.array(z.string()).optional(),
    type: z.string(),
    tags: z.array(z.string()).optional(),
    excerpt: z.string().optional(),
  }),
});

const notesCollection = defineCollection({
  type: "content",
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    pubDate: z.coerce.date(),
    updated: z.coerce.date(),
    status: z.string(),
    description: z.string(),
    backlinks: z.array(z.string()).optional(),
    type: z.string(),
    tags: z.array(z.string()).optional(),
    excerpt: z.string().optional(),
  }),
});

const photosCollection = defineCollection({
  type: "content",
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    shotDate: z.coerce.date().optional(),
    camera: z.string().optional(),
  }),
});

export const collections = {
  articles: articlesCollection,
  notes: notesCollection,
  photos: photosCollection,
};
