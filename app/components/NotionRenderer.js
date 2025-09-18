// app/components/NotionRenderer.jsx
"use client";

import { Fragment } from "react";

// Helper function to render rich text
function RichText({ text }) {
  if (!text || !text.length) return null;

  return (
    <>
      {text.map((value, index) => {
        const {
          annotations: { bold, code, color, italic, strikethrough, underline },
          text,
        } = value;

        return (
          <span
            key={index}
            className={[
              bold && "font-bold",
              code && "font-mono bg-gray-100 px-1 py-0.5 rounded text-sm",
              italic && "italic",
              strikethrough && "line-through",
              underline && "underline",
            ]
              .filter(Boolean)
              .join(" ")}
            style={color !== "default" ? { color } : {}}
          >
            {text?.link ? (
              <a
                href={text.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {text.content}
              </a>
            ) : (
              text?.content
            )}
          </span>
        );
      })}
    </>
  );
}

// Main renderer component
export function NotionRenderer({ blocks }) {
  if (!blocks || !blocks.length) {
    return <div className="text-gray-500">No content available</div>;
  }

  const renderBlock = (block) => {
    const { type, id } = block;
    const value = block[type];

    switch (type) {
      case "paragraph":
        return (
          <p className="mb-4 leading-relaxed">
            <RichText text={value.rich_text} />
          </p>
        );

      case "heading_1":
        return (
          <h1 className="text-3xl font-bold mb-4 mt-8">
            <RichText text={value.rich_text} />
          </h1>
        );

      case "heading_2":
        return (
          <h2 className="text-2xl font-bold mb-3 mt-6">
            <RichText text={value.rich_text} />
          </h2>
        );

      case "heading_3":
        return (
          <h3 className="text-xl font-bold mb-2 mt-4">
            <RichText text={value.rich_text} />
          </h3>
        );

      case "bulleted_list_item":
        return (
          <li className="ml-6 mb-2 list-disc">
            <RichText text={value.rich_text} />
          </li>
        );

      case "numbered_list_item":
        return (
          <li className="ml-6 mb-2 list-decimal">
            <RichText text={value.rich_text} />
          </li>
        );

      case "to_do":
        return (
          <div className="flex items-start mb-2">
            <input
              type="checkbox"
              checked={value.checked}
              readOnly
              className="mr-2 mt-1"
            />
            <span className={value.checked ? "line-through opacity-60" : ""}>
              <RichText text={value.rich_text} />
            </span>
          </div>
        );

      case "toggle":
        return (
          <details className="mb-4">
            <summary className="cursor-pointer font-medium">
              <RichText text={value.rich_text} />
            </summary>
            <div className="mt-2 ml-4">
              {block.children?.map((child) => (
                <Fragment key={child.id}>{renderBlock(child)}</Fragment>
              ))}
            </div>
          </details>
        );

      case "quote":
        return (
          <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic">
            <RichText text={value.rich_text} />
          </blockquote>
        );

      case "callout":
        return (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 my-4 flex">
            <div className="mr-3 text-xl">{value.icon?.emoji || "💡"}</div>
            <div className="flex-1">
              <RichText text={value.rich_text} />
            </div>
          </div>
        );

      case "divider":
        return <hr className="my-8 border-gray-200" />;

      case "code":
        return (
          <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 my-4 overflow-x-auto">
            <code className="text-sm font-mono">
              <RichText text={value.rich_text} />
            </code>
            {value.language && (
              <div className="text-xs text-gray-400 mt-2">{value.language}</div>
            )}
          </pre>
        );

      case "image":
        const src =
          value.type === "external" ? value.external.url : value.file.url;
        return (
          <figure className="my-6">
            <img
              src={src}
              alt={value.caption?.[0]?.plain_text || "Image"}
              className="w-full rounded-lg"
            />
            {value.caption?.length > 0 && (
              <figcaption className="text-center text-sm text-gray-500 mt-2">
                <RichText text={value.caption} />
              </figcaption>
            )}
          </figure>
        );

      case "video":
        const videoSrc =
          value.type === "external" ? value.external.url : value.file.url;
        return (
          <div className="my-6">
            {value.type === "external" && videoSrc.includes("youtube.com") ? (
              <iframe
                src={videoSrc.replace("watch?v=", "embed/")}
                className="w-full aspect-video rounded-lg"
                allowFullScreen
              />
            ) : (
              <video src={videoSrc} controls className="w-full rounded-lg" />
            )}
          </div>
        );

      case "embed":
        return (
          <div className="my-6">
            <iframe
              src={value.url}
              className="w-full aspect-video rounded-lg border"
              allowFullScreen
            />
          </div>
        );

      case "bookmark":
        return (
          <a
            href={value.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-gray-200 rounded-lg p-4 my-4 hover:bg-gray-50 transition"
          >
            <div className="text-sm text-gray-500">{value.url}</div>
            {value.caption?.length > 0 && (
              <div className="mt-2">
                <RichText text={value.caption} />
              </div>
            )}
          </a>
        );

      case "table":
        return (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse border border-gray-200">
              <tbody>
                {block.children?.map((row, i) => (
                  <tr
                    key={row.id}
                    className={
                      i === 0 && value.has_column_header
                        ? "bg-gray-50 font-semibold"
                        : ""
                    }
                  >
                    {row.table_row?.cells?.map((cell, j) => (
                      <td key={j} className="border border-gray-200 px-4 py-2">
                        <RichText text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return (
          <div className="text-gray-400 text-sm my-2">
            Unsupported block type: {type}
          </div>
        );
    }
  };

  // Group list items together
  const groupedBlocks = [];
  let currentList = null;
  let listType = null;

  blocks.forEach((block) => {
    if (
      block.type === "bulleted_list_item" ||
      block.type === "numbered_list_item"
    ) {
      if (!currentList || listType !== block.type) {
        currentList = [];
        listType = block.type;
        groupedBlocks.push({
          type: "list",
          listType,
          items: currentList,
        });
      }
      currentList.push(block);
    } else {
      currentList = null;
      listType = null;
      groupedBlocks.push(block);
    }
  });

  return (
    <div className="notion-content prose prose-gray max-w-none">
      {groupedBlocks.map((block, index) => {
        if (block.type === "list") {
          const ListTag = block.listType === "numbered_list_item" ? "ol" : "ul";
          return (
            <ListTag key={index} className="mb-4">
              {block.items.map((item) => (
                <Fragment key={item.id}>{renderBlock(item)}</Fragment>
              ))}
            </ListTag>
          );
        }
        return <Fragment key={block.id}>{renderBlock(block)}</Fragment>;
      })}
    </div>
  );
}
