import { getProjectData } from "@/app/lib/content";

import Link from "next/link";

export default async function Project({ params }) {
  const { slug } = await params;
  const writingData = await getProjectData(slug);

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
