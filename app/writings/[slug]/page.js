import { getContentData } from "@/app/lib/content";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default async function Writing({ params }) {
  const { slug } = await params;
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
          <ReactMarkdown
            components={{
              // Code block rendering
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : '';
                
                if (!inline && language) {
                  return (
                    <SyntaxHighlighter
                      style={coldarkDark}
                      language={language}
                      PreTag="div"
                      {...props}
                      className="rounded-lg my-4"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  );
                }
                
                return (
                  <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                    {children}
                  </code>
                );
              },
              // Table rendering
              table({ node, children, ...props }) {
                return (
                  <div className="overflow-x-auto my-6 shadow-sm rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200" {...props}>
                      {children}
                    </table>
                  </div>
                );
              },
              // Table head rendering
              thead({ node, children, ...props }) {
                return (
                  <thead className="bg-gray-50" {...props}>
                    {children}
                  </thead>
                );
              },
              // Table body rendering
              tbody({ node, children, ...props }) {
                return (
                  <tbody className="bg-white divide-y divide-gray-200" {...props}>
                    {children}
                  </tbody>
                );
              },
              // Table row rendering
              tr({ node, children, ...props }) {
                return (
                  <tr {...props}>
                    {children}
                  </tr>
                );
              },
              // Table header cell rendering
              th({ node, children, ...props }) {
                return (
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" 
                    {...props}
                  >
                    {children}
                  </th>
                );
              },
              // Table data cell rendering
              td({ node, children, ...props }) {
                return (
                  <td className="px-4 py-3 text-sm text-gray-700" {...props}>
                    {children}
                  </td>
                );
              }
            }}
          >
            {writingData.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}