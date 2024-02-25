import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: { type: "text", value: "↗" },
          target: "_blank",
        },
      ],
      [rehypeKatex, {}],
    ],
    shikiConfig: {
      theme: "vitesse-dark",
      wrap: true,
    },
  },
  site: "https://kenan.fyi",
  integrations: [],
});
