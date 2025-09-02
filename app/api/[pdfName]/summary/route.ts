"use server";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { generateSummary } from "@/lib/gemini/summarize";
import jwt from "jsonwebtoken";

// Generate + Save Summary
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ pdfName: string }> }
) {
  try {
    const { pdfName } = await context.params;

    const token = req.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, "nnanna") as { id: string };
    const user = await User.findById(decoded.id);
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file)
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      );

    const buffer = Buffer.from(await file.arrayBuffer());
    const summary = await generateSummary(buffer);

    const existingPdf = user.pdfs.find((pdf) => pdf.filename === pdfName);

    if (existingPdf) {
      existingPdf.summary = summary;
    } else {
      user.pdfs.push({
        filename: pdfName,
        title: pdfName,
        summary,
        pyqs: [],
        uploadedAt: new Date(),
      });
    }

    await user.save();

    return NextResponse.json({
      message: "Summary generated successfully",
      summary,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error generating summary", error: err.message },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ pdfName: string }> }
) {
  try {
    const { pdfName } = await context.params;

    const token = req.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, "nnanna") as { id: string };
    const user = await User.findById(decoded.id);
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const pdf = user.pdfs.find((pdf) => pdf.filename === pdfName);
    if (!pdf || !pdf.summary) {
      return NextResponse.json({ error: "Summary not found" }, { status: 404 });
    }

    return NextResponse.json({
      topics: Array.isArray(pdf.summary)
        ? pdf.summary
        : [
            {
              title: pdf.filename,
              summary:
                typeof pdf.summary === "string"
                  ? pdf.summary
                  : "No summary available",
            },
          ],
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error fetching summary", error: err.message },
      { status: 500 }
    );
  }
}
