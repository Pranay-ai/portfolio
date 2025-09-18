import Link from "next/link";
import { Client } from "@notionhq/client";
import { NotionRenderer } from "@/app/components/NotionRenderer";
import { getProjectData } from "@/app/lib/content";
import { notFound } from "next/navigation";

// Optional: Use ISR instead of force-dynamic for better performance
export const revalidate = 3600; // revalidate every hour

export default async function Writing({ params }) {
  const { slug } = await params;

  try {
    // Get your writing data
    const { notion_link, title } = await getProjectData(slug);

    if (!notion_link) {
      notFound();
    }

    // Extract page ID from notion link
    // Notion links usually look like: https://notion.so/Page-Title-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    let pageId = notion_link.split("-").pop();

    // Clean up the page ID (remove any query params or hash)
    pageId = pageId?.split("?")[0].split("#")[0];

    // Validate page ID format (should be 32 characters)
    if (!pageId || pageId.length !== 32) {
      console.error("Invalid Notion page ID:", pageId);
      notFound();
    }
    // Initialize Notion client
    const notion = new Client({
      auth: process.env.NOTION_API_KEY, // You'll need to set this
    });

    // Fetch the page data
    const page = await notion.pages.retrieve({
      page_id: pageId,
    });

    // Fetch the page content (blocks)
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100, // Adjust as needed
    });

    // For pages with more than 100 blocks, fetch all blocks
    let allBlocks = blocks.results;
    let cursor = blocks.next_cursor;

    while (cursor) {
      const moreBlocks = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 100,
        start_cursor: cursor,
      });
      allBlocks = [...allBlocks, ...moreBlocks.results];
      cursor = moreBlocks.next_cursor;
    }

    return (
      <div className="bg-[--porcelain] min-h-screen">
        <div className="mx-auto max-w-4xl py-24 px-6">
          <Link
            href="/#writing"
            className="font-medium text-[--onyx] hover:text-[--soft-gold] transition-colors group mb-12 inline-block"
          >
            <span className="group-hover:-translate-x-1 transition-transform inline-block">
              &lt;-
            </span>{" "}
            Back to Portfolio
          </Link>

          <h1 className="text-3xl mb-3.5">{title}</h1>

          <NotionRenderer page={page} blocks={allBlocks} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading Notion page:", error);
    notFound();
  }
}
