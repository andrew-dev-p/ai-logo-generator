import { generatePrompt, generateImage } from "@/lib/gemini";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    const generatedPrompt = await generatePrompt(prompt);

    const generatedImage = await generateImage(generatedPrompt);

    return NextResponse.json({ generatedImage });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}
