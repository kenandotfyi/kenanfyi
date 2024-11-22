//@ts-nocheck
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx";
import { loadRenderers } from "astro:container";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import sanitizeHtml from "sanitize-html";

export async function GET(context: unknown) {
  const renderers = await loadRenderers([getMDXRenderer()]);
  const container = await AstroContainer.create({ renderers });

  let articles = await getCollection("articles", ({ data }) => {
    return data.draft !== true;
  });

  articles = articles.sort(
    (a: unknown, b: unknown) => b.data.pubDate - a.data.pubDate,
  );

  let notes = await getCollection("notes", ({ data }) => {
    return data.draft !== true;
  });

  notes = notes.sort(
    (a: unknown, b: unknown) => b.data.pubDate - a.data.pubDate,
  );

  // remove the .hiddenContent divs, so they don't show up in the feed readers
  //

  function cleanContent(htmlString) {
    // First, remove any divs with class 'hidden' or style="display: none"
    const cleaned = sanitizeHtml(htmlString, {
      exclusiveFilter: function (frame) {
        // Remove elements with class 'hidden'
        if (
          frame.attribs &&
          frame.attribs.class &&
          frame.attribs.class.includes("hiddenContent")
        ) {
          return true;
        }
        // Remove elements with display: none
        if (
          frame.attribs &&
          frame.attribs.style &&
          frame.attribs.style.includes("display: none")
        ) {
          return true;
        }
        return false;
      },
    });

    return cleaned;
  }

  const items = [];

  for (const article of articles) {
    const { Content } = await article.render();
    const content = await container.renderToString(Content);
    const link = new URL(
      `/articles/${article.slug}`,
      context.url.origin,
    ).toString();
    const sanitizedContent = cleanContent(content);
    items.push({ ...article.data, link, content: sanitizedContent });
  }

  for (const note of notes) {
    const { Content } = await note.render();
    const content = await container.renderToString(Content);
    const link = new URL(`/notes/${note.slug}`, context.url.origin).toString();
    const sanitizedContent = cleanContent(content);
    items.push({ ...note.data, link, content: sanitizedContent });
  }

  return rss({
    title: "kenan.fyi",
    description: "bits from my second brain",
    site: context.site.toString(),
    customData: "<language>en</language>",
    xmlns: {
      atom: "http://www.w3.org/2005/Atom/",
      dc: "http://purl.org/dc/elements/1.1/",
      content: "http://purl.org/rss/1.0/modules/content/",
    },
    items,
  });
}
