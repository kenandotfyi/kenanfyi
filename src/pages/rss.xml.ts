import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: any) {
  const posts = await getCollection("articles");

  const items = posts
    .sort((a: any, b: any) => b.data.pubDate - a.data.pubDate)
    .map(({ data: { pubDate, title, description }, slug }) => ({
      title,
      description,
      link: `${context.site}articles/${slug}`,
      pubDate: new Date(pubDate.toISOString().split("T")[0]),
    }));

  return rss({
    title: "kenan.fyi",
    description: "bits from my second brain",
    site: context.site.toString(),
    customData: "<language>en</language>",
    items,
  });
}
