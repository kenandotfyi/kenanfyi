import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import { remarkReadingTime } from "./remark-reading-time.mjs";
import remarkMath from "remark-math";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerNotationFocus,
  transformerNotationErrorLevel,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerRenderWhitespace,
} from '@shikijs/transformers';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  image: {
    domains: ["img.kenan.fyi"],
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover"
  },
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
          rel: "noopener"
        },
      ],
      [rehypeKatex, {}],
    ],
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: "vitesse-light",
      wrap: false,
      transformers: [transformerNotationDiff(),
      transformerNotationHighlight(),
      transformerNotationWordHighlight(),
      transformerNotationFocus(),
      transformerNotationErrorLevel(),
      transformerMetaHighlight(),
      transformerMetaWordHighlight(),
      transformerRenderWhitespace(),]
    },
  },
  site: "https://kenan.fyi",
  integrations: [mdx({
    extendMarkdownConfig: true,
  })],
});

