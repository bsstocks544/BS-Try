import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface TryOnParams {
  userImageBase64: string;
  userImageMimeType: string;
  outfitDescription: string;
  outfitImageBase64?: string;
  outfitImageMimeType?: string;
}

/**
 * Helper to wait for a specific duration
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Resizes a base64 image to a maximum dimension while maintaining aspect ratio.
 * This helps stay within Gemini API token limits.
 */
async function resizeImage(base64: string, mimeType: string, maxDim = 768): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxDim) {
          height *= maxDim / width;
          width = maxDim;
        }
      } else {
        if (height > maxDim) {
          width *= maxDim / height;
          height = maxDim;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      
      // Fill with white background for transparency support (e.g. PNG to JPEG)
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
      }
      
      // Use lower quality (0.7) to significantly save tokens
      const resizedBase64 = canvas.toDataURL('image/jpeg', 0.7);
      resolve(resizedBase64.split(',')[1]);
    };
    img.src = `data:${mimeType};base64,${base64}`;
  });
}

/**
 * Generates a try-on image using Gemini AI with retry logic for quota errors.
 */
export async function generateTryOn(
  params: TryOnParams, 
  retryCount = 0, 
  onRetry?: (seconds: number) => void
): Promise<string> {
  const { userImageBase64, userImageMimeType, outfitDescription, outfitImageBase64, outfitImageMimeType } = params;

  // Resize images to save tokens and stay within free tier limits
  const resizedUserImage = await resizeImage(userImageBase64, userImageMimeType);
  let resizedOutfitImage = outfitImageBase64;
  if (outfitImageBase64 && outfitImageMimeType) {
    resizedOutfitImage = await resizeImage(outfitImageBase64, outfitImageMimeType);
  }

  const prompt = `Edit this image by changing only the outfit to ${outfitDescription}. 
Keep the person's face, pose, body proportions, background, lighting, and camera angle exactly the same. 
Do not alter identity or scene. Photorealistic, high quality.`;

  const parts: any[] = [
    {
      inlineData: {
        data: resizedUserImage,
        mimeType: 'image/jpeg',
      },
    },
    {
      text: prompt,
    },
  ];

  if (resizedOutfitImage && outfitImageMimeType) {
    parts.push({
      inlineData: {
        data: resizedOutfitImage,
        mimeType: 'image/jpeg',
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

    // Handle Quota Exceeded (429)
    if (error.message?.includes("429") || error.message?.includes("quota") || error.message?.includes("RESOURCE_EXHAUSTED")) {
      if (retryCount < 2) {
        // Wait for 32 seconds (as suggested by the error message) and retry
        // We use a slightly longer delay to be safe
        const delay = 32000 * (retryCount + 1);
        const seconds = delay / 1000;
        console.log(`Quota exceeded. Retrying in ${seconds}s... (Attempt ${retryCount + 1})`);
        
        if (onRetry) onRetry(seconds);
        
        await sleep(delay);
        return generateTryOn(params, retryCount + 1, onRetry);
      }
      
      throw new Error("The AI is currently busy due to high demand (Free Tier limit). Please wait a minute and try again.");
    }

    throw new Error(error.message || "Failed to generate image.");
  }
}
