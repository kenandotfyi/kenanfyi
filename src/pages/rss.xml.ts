//@ts-nocheck
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx";
import { loadRenderers } from "astro:container";
import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import sanitizeHtml from "sanitize-html";

export async function GET(context: any) {
  const renderers = await loadRenderers([getMDXRenderer()]);
  const container = await AstroContainer.create({ renderers });


  let articles = await getCollection("articles", ({ data }) => {
    return data.draft !== true;
  });

  articles = articles.sort((a: any, b: any) => b.data.pubDate - a.data.pubDate);

  let notes = await getCollection("notes", ({ data }) => {
    return data.draft !== true;
  });

  notes = notes.sort((a: any, b: any) => b.data.pubDate - a.data.pubDate);

  // remove the .hiddenContent divs, so they don't show up in the feed readers
  //

  function removeElementsWithClass(htmlString: string, className: string) {
    // Configure sanitize-html to transform and remove elements
    const cleanHtml = sanitizeHtml(htmlString, {
      // Allow all tags and attributes initially
      allowedTags: false,
      allowedAttributes: false,

      // Use the transform function to filter elements
      transformTags: {
        'span': (tagName, attribs) => {
          // Check if the element has the specific class
          if (attribs.class && attribs.class.split(' ').includes(className)) {
            return { tagName: false }; // Removes the tag
          }
          return { tagName, attribs }; // Keep the tag as is
        }
      }
    });

    return cleanHtml;
  }

  const items = [];
  var classToBeHidden = 'hiddenContent'

  for (const article of articles) {
    const { Content } = await article.render();
    const content = await container.renderToString(Content);
    const link = new URL(`/articles/${article.slug}`, context.url.origin).toString();
    const sanitizedContent = removeElementsWithClass(content, classToBeHidden);
    items.push({ ...article.data, link, sanitizedContent });
  }

  for (const note of notes) {
    const { Content } = await note.render();
    const content = await container.renderToString(Content);
    const link = new URL(`/notes/${note.slug}`, context.url.origin).toString();
    const sanitizedContent = removeElementsWithClass(content, classToBeHidden);
    items.push({ ...note.data, link, sanitizedContent });
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
