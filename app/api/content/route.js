import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { type, id, title, description, content, ...meta } =
      await request.json();

    if (!type || !id || !title || !content) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const dir = path.join(process.cwd(), "app/content", type);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const frontmatter = `---
title: '${title}'
description: '${description || ""}'
date: '${new Date().toISOString()}'
${Object.entries(meta)
  .map(([key, value]) => `${key}: '${value}'`)
  .join("\n")}
---

${content}
`;

    const filePath = path.join(dir, `${id}.md`);
    fs.writeFileSync(filePath, frontmatter);

    return NextResponse.json(
      { message: "Content created successfully", path: filePath },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
