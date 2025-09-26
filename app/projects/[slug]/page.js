import Link from "next/link";
import { NotionRenderer } from "@/app/components/NotionRenderer";
import { getProjectData } from "@/app/lib/content";
import { notFound, redirect } from "next/navigation";

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

  // Fetch from your API route - try different base URL approaches
  let apiUrl;
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/notion/${pageId}`;
  } else if (process.env.VERCEL_URL) {
    apiUrl = `https://${process.env.VERCEL_URL}/api/notion/${pageId}`;
  } else {
    // For local development or when deployed, use relative URL
    apiUrl = `/api/notion/${pageId}`;
  }

  let response;
  try {
    console.log("Fetching from:", apiUrl);
    response = await fetch(apiUrl, {
      next: { revalidate: 300 },
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (fetchError) {
    console.error("Fetch error:", fetchError);
    return <ErrorPage message="Failed to load content" />;
  }

  if (!response.ok) {
    console.error(`API responded with status: ${response.status}`);
    console.error(
      "Response:",
      await response.text().catch(() => "Could not read response")
    );
    return <ErrorPage message="Content temporarily unavailable" />;
  }

  let data;
  try {
    data = await response.json();
  } catch (parseError) {
    console.error("JSON parse error:", parseError);
    return <ErrorPage message="Invalid content format" />;
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
