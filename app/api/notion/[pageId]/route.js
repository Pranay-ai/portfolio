// app/api/notion/[pageId]/route.js
import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Simple fetch function without caching complexity
async function fetchNotionData(pageId) {
  try {
    // Get the page
    const page = await notion.pages.retrieve({ page_id: pageId });

    // Get all blocks
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

export async function GET(request, { params }) {
  try {
    const { pageId } = await params;

    if (!pageId) {
      return NextResponse.json(
        { error: "Page ID is required" },
        { status: 400 }
      );
    }

    const data = await fetchNotionData(pageId);

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Notion content" },
      { status: 500 }
    );
  }
}
