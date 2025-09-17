import Link from "next/link";
import { NotionAPI } from "notion-client";
import NotionClient from "@/app/components/NotionClient";
import { getProjectData } from "@/app/lib/content";
import "react-notion-x/src/styles.css";
import "katex/dist/katex.min.css";

export default async function Writing({ params }) {
  const { slug } = await params;

  // your helper (unchanged)
  const { notion_link, title } = await getProjectData(slug);

  console.log(notion_link);

  // quick page-id extraction; use a robust parser in prod
  const pageId = notion_link.split("-").pop();

  const notion = new NotionAPI();
  const recordMap = await notion.getPage(pageId);

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

        <NotionClient recordMap={recordMap} />
      </div>
    </div>
  );
}
