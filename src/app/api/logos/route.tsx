import { generatePrompt, generateImage } from "@/lib/gemini";
import { NextRequest, NextResponse } from "next/server";
import { db, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

async function saveImageToStorage(base64Image: string, userId: string) {
  const base64Data = base64Image.split(",")[1];
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: "image/png" });

  const storageRef = ref(storage, `logos/${userId}/${Date.now()}.png`);
  await uploadBytes(storageRef, blob);

  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const generatedPrompt = await generatePrompt(prompt);
    const generatedImage = await generateImage(generatedPrompt);

    const imageUrl = await saveImageToStorage(generatedImage, userId);

    const logoDoc = await addDoc(collection(db, "logos"), {
      userId,
      prompt,
      generatedPrompt,
      imageUrl,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      generatedImage,
      imageUrl,
      logoId: logoDoc.id,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}
