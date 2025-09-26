import Link from "next/link";
import { NotionRenderer } from "@/app/components/NotionRenderer";
import { getProjectData } from "@/app/lib/content";
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
        <div className="text-center py-12">
          <h1 className="text-2xl mb-4">Content Not Available</h1>
          <p className="text-gray-600">{message}</p>
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
    projectData = await getProjectData(slug);
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
        <NotionRenderer page={page} blocks={blocks} />
      </div>
    </div>
  );
}
