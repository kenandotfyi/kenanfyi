import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt({
  html: true,
});

export async function GET(context: any) {
  let articles = await getCollection("articles", ({ data }) => {
    return data.draft !== true;
  });

  let notes = await getCollection("notes", ({ data }) => {
    return data.draft !== true;
  });

  let rssContent = [...articles, ...notes];
  rssContent = rssContent.sort((a: any, b: any) => b.data.pubDate - a.data.pubDate);

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
    items: rssContent.map((e) => ({
      title: e.data.title,
      description: e.data.description,
      pubDate: new Date(e.data.pubDate.toISOString()),
      link: `${context.site}articles/${e.slug}`,
      content: sanitizeHtml(parser.render(e.body)),
    })),
  });
}
