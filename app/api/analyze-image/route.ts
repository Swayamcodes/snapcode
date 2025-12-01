import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 1. Upload to Vercel Blob
    const buffer = Buffer.from(await file.arrayBuffer());
    const blob = await put(`ui-${Date.now()}.png`, buffer, {
      access: "public",
      contentType: file.type,
    });

    // 2. Send to Gemini Vision
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
Extract all UI elements from this screenshot.
Return ONLY JSON.
Each item must follow this format:

{
  "id": "unique-id",
  "type": "button/text/input/card/image/heading",
  "text": "if any",
  "bounds": { "x": number, "y": number, "width": number, "height": number },
  "style": { "bgColor": "", "textColor": "", "borderRadius": 0 }
}

If something is not identifiable, skip it.
`;

    const result = await model.generateContent([
      {
        inlineData: {
          data: buffer.toString("base64"),
          mimeType: file.type,
        },
      },
      prompt,
    ]);

    const text = result.response.text();

    // Safe JSON parse
    const jsonStart = text.indexOf("[");
    const jsonEnd = text.lastIndexOf("]");
    const jsonString = text.substring(jsonStart, jsonEnd + 1);

    const components = JSON.parse(jsonString);

    return NextResponse.json({
      success: true,
      imageUrl: blob.url,
      components,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to analyze image" }, { status: 500 });
  }
}
