"use client";
import "react-notion-x/src/styles.css";
import "katex/dist/katex.min.css";

import dynamic from "next/dynamic";
import { NotionRenderer } from "react-notion-x";

// lazy-load client-only bits (prism, etc.)
const Code = dynamic(
  () => import("react-notion-x/build/third-party/code").then((m) => m.Code),
  { ssr: false }
);

// (optional) add more third-party blocks the same way:
// const Collection = dynamic(() => import('react-notion-x/build/third-party/collection').then(m => m.Collection), { ssr: false });

export default function NotionClient({ recordMap }) {
  return (
    <article className="bg-white p-6 md:p-8 rounded-lg shadow-md">
      <NotionRenderer
        recordMap={recordMap}
        disableHeader
        components={{ Code /*, Collection */ }}
      />
    </article>
  );
}
