"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API!);

export async function generateSummary(buffer: Buffer): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    // Convert buffer -> base64 string
    const base64Pdf: string = buffer.toString("base64");

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "application/pdf",
          data: base64Pdf,
        },
      },
      {
        text: `You are an AI study assistant.
        Summarize the following content into topic-wise manere every concept in topic array but explain each thing in detail and with example. teach the topic as you are teacher and explaing the topic to students in detail use pdf provide for the topics:
        {
            "topics": [
            {
                "title": "Topic name",
                "summary": "Concise explanation in simple language"
            }
            ]
        }`,
      },
    ]);

    return result.response.text();
  } catch (error) {
    console.error("Gemini summary error:", error);
    throw new Error("Failed to generate summary from Gemini");
  }
}
