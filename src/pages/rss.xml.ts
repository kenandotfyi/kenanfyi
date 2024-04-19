import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
// import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context: any) {
  let articles = await getCollection("articles", ({ data }) => {
    return data.draft !== true;
  });
  articles = articles.sort((a: any, b: any) => b.data.pubDate - a.data.pubDate);

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
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: new Date(article.data.pubDate.toISOString()),
      link: `${context.site}articles/${article.slug}`,
      content: parser.render(article.body),
    })),
  });
}
