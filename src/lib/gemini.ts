import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

const textConfig = {
  responseMimeType: "text/plain",
};

const imageConfig = {
  responseModalities: ["IMAGE", "TEXT"],
  responseMimeType: "text/plain",
};

const textModel = "gemini-2.0-flash-lite";
const imageModel = "gemini-2.0-flash-preview-image-generation";

const generatePrompt = async (text: string) => {
  const contents = [
    {
      role: "user",
      parts: [
        {
          text,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model: textModel,
    config: textConfig,
    contents,
  });

  let prompt = "";
  for await (const chunk of response) {
    prompt += chunk.text;
  }

  const jsonCodeBlockPattern = /```json\n?|\n?```/g;
  return prompt.replace(jsonCodeBlockPattern, "").trim();
};

const generateImage = async (prompt: string) => {
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model: imageModel,
    config: imageConfig,
    contents,
  });

  for await (const chunk of response) {
    if (!chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
      continue;
    }

    const inlineData = chunk.candidates[0].content.parts[0].inlineData;
    return `data:${inlineData.mimeType};base64,${inlineData.data}`;
  }

  throw new Error("No image data received from Gemini");
};

export { generatePrompt, generateImage };
