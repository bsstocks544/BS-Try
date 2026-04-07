import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface TryOnParams {
  userImageBase64: string;
  userImageMimeType: string;
  outfitDescription: string;
  outfitImageBase64?: string;
  outfitImageMimeType?: string;
}

export async function generateTryOn(params: TryOnParams): Promise<string> {
  const { userImageBase64, userImageMimeType, outfitDescription, outfitImageBase64, outfitImageMimeType } = params;

  const prompt = `Edit this image by changing only the outfit to ${outfitDescription}. 
Keep the person's face, pose, body proportions, background, lighting, and camera angle exactly the same. 
Do not alter identity or scene. Photorealistic, high quality.`;

  const parts: any[] = [
    {
      inlineData: {
        data: userImageBase64,
        mimeType: userImageMimeType,
      },
    },
    {
      text: prompt,
    },
  ];

  if (outfitImageBase64 && outfitImageMimeType) {
    parts.push({
      inlineData: {
        data: outfitImageBase64,
        mimeType: outfitImageMimeType,
      },
    });
    parts.push({
      text: "Use this outfit image as the reference for the new clothing.",
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: parts,
      },
    });

    if (!response.candidates?.[0]?.content?.parts) {
      throw new Error("No response from AI model.");
    }

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }

    throw new Error("AI did not generate an image. Please try a different description.");
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate image.");
  }
}
