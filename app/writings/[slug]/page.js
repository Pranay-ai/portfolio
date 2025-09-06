import { getContentData, getWritingData } from "@/app/lib/content";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default async function Writing({ params }) {
  const { slug } = await params;
  const writingData = await getWritingData(slug);

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
        {/* <div className="bg-white p-8 rounded-lg shadow-md"></div> */}
        <iframe
          src={writingData.notion_link}
          className="w-full h-[75vh] rounded-lg shadow-md"
          style={{ minHeight: "600px" }}
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
}
