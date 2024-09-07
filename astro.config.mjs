import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import remarkMath from "remark-math";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkReadingTime, remarkMath],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          properties: {
            className: "external-link",
          },
          target: "_blank",
        },
      ],
      [rehypeKatex, {}],
    ],
    shikiConfig: {
      theme: "vitesse-light",
      wrap: false,
    },
  },
  site: "https://kenan.fyi",
  integrations: [mdx()],
});

