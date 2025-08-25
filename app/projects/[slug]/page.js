import { getContentData } from "@/app/lib/content";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import Image from "next/image"; // Import the Next.js Image component

export default async function Project({ params }) {
  const { slug } = params;
  const projectData = await getContentData("projects", slug);

  return (
    <div className="bg-[--porcelain] min-h-screen">
      <div className="mx-auto max-w-4xl py-24 px-6">
        <Link
          href="/#projects"
          className="font-medium text-[--onyx] hover:text-[--soft-gold] transition-colors group mb-12 inline-block"
        >
          <span className="group-hover:-translate-x-1 transition-transform inline-block">
            &lt;-
          </span>{" "}
          Back to Portfolio
        </Link>

        <h1 className="font-headline text-4xl md:text-6xl">
          {projectData.title}
        </h1>
        <p className="text-lg text-gray-500 mt-4">{projectData.tech}</p>

        {/* This block now uses the optimized Next.js Image component */}
        {projectData.image && (
          <div className="mt-12 mb-16 relative">
            <Image
              src={"../" + projectData.image}
              alt={projectData.title}
              width={1200} // Specify a width for optimization
              height={675} // Specify a height to prevent layout shift
              className="w-full h-auto rounded-lg shadow-lg"
              priority={false} // Add this line to fix the preload warning
            />
          </div>
        )}

        <div className="markdown-content">
          <ReactMarkdown>{projectData.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
