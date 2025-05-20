"use client";

import { UserContext } from "@/context/user-context";
import prompt from "@/lib/prompt";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";

const GenerateLogo = () => {
  const { userData } = useContext(UserContext);
  const { user } = useUser();

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    palette: string;
    design: string;
    prompt: string;
  } | null>(null);

  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && userData?.email) {
      const storage = localStorage.getItem("formData");
      if (storage) {
        const formData = JSON.parse(storage);
        setFormData(formData);
      }
    }
  }, [userData]);

  const generateLogo = async () => {
    if (!user?.id) {
      console.error("User not authenticated");
      return;
    }

    const PROMPT = prompt.LOGO_PROMPT.replace(
      "{logoTitle}",
      formData?.title || ""
    )
      .replace("{logoDesc}", formData?.description || "")
      .replace("{logoColor}", formData?.palette || "")
      .replace("{logoDesign}", formData?.design || "")
      .replace("{logoPrompt}", formData?.prompt || "");

    const response = await axios.post("/api/logos", {
      prompt: PROMPT,
      userId: user.id,
    });
    setGeneratedImage(response.data.generatedImage);
  };

  useEffect(() => {
    if (formData?.title) {
      generateLogo();
    }
  }, [formData]);

  return (
    <div className="rounded-md overflow-hidden">
      {generatedImage ? (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <h3 className="text-2xl font-bold">Your Logo is Ready!</h3>
          <Image
            className="rounded-md"
            src={generatedImage}
            alt="Generated Logo"
            width={400}
            height={400}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p className="text-sm text-gray-500">Generating logo...</p>
        </div>
      )}
    </div>
  );
};

export default GenerateLogo;
