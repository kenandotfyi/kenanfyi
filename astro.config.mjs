import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: { type: "text", value: "↗" },
        },
      ],
    ],
  },
  site: "https://kenan.fyi",
  integrations: [],
});
