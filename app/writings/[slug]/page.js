import Link from "next/link";
import { NotionRenderer } from "@/app/components/NotionRenderer";
import { getWritingData } from "@/app/lib/content";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Direct fetch function
async function fetchNotionPage(pageId) {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });

    let allBlocks = [];
    let cursor = undefined;

    do {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 100,
        start_cursor: cursor,
      });

      allBlocks = allBlocks.concat(response.results);
      cursor = response.has_more ? response.next_cursor : undefined;
    } while (cursor);

    return { page, blocks: allBlocks };
  } catch (error) {
    console.error("Error fetching Notion data:", error);
    throw error;
  }
}

// Helper to extract Notion page ID
function extractPageId(notionLink) {
  if (!notionLink) return null;

  // Get the last part after splitting by '-' or '/'
  let id = notionLink.split(/[-\/]/).pop();
  if (!id) return null;

  // Remove query params and hash
  id = id.split("?")[0].split("#")[0];

  // Remove dashes if it's a UUID format
  id = id.replace(/-/g, "");

  // Should be exactly 32 characters
  return id.length === 32 ? id : null;
}

// Error component
function ErrorPage({ message }) {
  return (
    <div className="bg-gradient-to-b from-[--cream] to-[--ivory] min-h-screen">
      <div className="mx-auto max-w-4xl py-32 px-6">
        <Link
          href="/#writings"
          className="group inline-flex items-center gap-3 font-sans-elegant text-xs tracking-[0.15em] uppercase text-[--taupe] hover:text-[--charcoal] transition-colors duration-300 mb-16"
        >
          <span className="w-8 h-px bg-[--sage-muted] group-hover:w-12 group-hover:bg-[--sage] transition-all duration-300" />
          Back to Portfolio
        </Link>
        <div className="text-center py-16">
          <h1 className="font-headline text-3xl text-[--charcoal] mb-6">Content Not Available</h1>
          <p className="text-[--graphite] font-light">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default async function Writing({ params }) {
  const { slug } = await params;

  // Get project data
  let projectData;
  try {
    projectData = await getWritingData(slug);
  } catch (error) {
    console.error("Error getting project data:", error);
    return <ErrorPage message="Project not found" />;
  }

  if (!projectData || !projectData.notion_link) {
    return <ErrorPage message="No Notion content available for this project" />;
  }

  const { notion_link, title } = projectData;

  // Extract and validate page ID
  const pageId = extractPageId(notion_link);
  if (!pageId) {
    console.error("Invalid Notion page ID from link:", notion_link);
    return <ErrorPage message="Invalid Notion page configuration" />;
  }

  // Fetch directly from Notion instead of through API route
  let data;
  try {
    console.log("Fetching Notion page:", pageId);
    data = await fetchNotionPage(pageId);
  } catch (error) {
    console.error("Failed to fetch Notion content:", error);
    return <ErrorPage message="Failed to load content from Notion" />;
  }

  const { page, blocks } = data;

  return (
    <div className="bg-gradient-to-b from-[--cream] via-[--ivory] to-[--blush-light]/20 min-h-screen">
      <div className="mx-auto max-w-4xl py-32 px-6">
        {/* Back link */}
        <Link
          href="/#writings"
          className="group inline-flex items-center gap-3 font-sans-elegant text-xs tracking-[0.15em] uppercase text-[--taupe] hover:text-[--charcoal] transition-colors duration-300 mb-16"
        >
          <span className="w-8 h-px bg-[--blush] group-hover:w-12 group-hover:bg-[--sage] transition-all duration-300" />
          Back to Articles
        </Link>

        {/* Article header */}
        <header className="mb-12">
          <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-[--taupe] mb-4">
            Technical Writing
          </p>
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-[--charcoal] tracking-wide leading-tight">
            {title}
          </h1>
          <div className="mt-8 w-24 h-px bg-gradient-to-r from-[--blush] to-[--sage-light]" />
        </header>

        {/* Content */}
        <article className="prose-luxury">
          <NotionRenderer page={page} blocks={blocks} />
        </article>
      </div>
    </div>
  );
}
