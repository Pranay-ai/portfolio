import { getContentData } from "@/app/lib/content";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default async function Writing({ params }) {
  const { slug } = params;
  const writingData = await getContentData("writings", slug);

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
        <h1 className="font-headline text-4xl md:text-6xl">
          {writingData.title}
        </h1>
        <p className="text-lg text-gray-500 mt-4">
          {new Date(writingData.date).toLocaleDateString()}
        </p>
        <div className="markdown-content mt-16">
          <ReactMarkdown>{writingData.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
