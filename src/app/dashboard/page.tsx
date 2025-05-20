"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import { Loader2 } from "lucide-react";

interface Logo {
  id: string;
  userId: string;
  prompt: string;
  generatedPrompt: string;
  imageUrl: string;
  createdAt: string;
}

const Dashboard = () => {
  const { user } = useUser();
  const [logos, setLogos] = useState<Logo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogos = async () => {
      if (!user?.id) return;

      try {
        const logosQuery = query(
          collection(db, "logos"),
          where("userId", "==", user.id),
          orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(logosQuery);
        const logosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Logo[];

        setLogos(logosData);
      } catch (error) {
        console.error("Error fetching logos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
        <p className="text-sm text-gray-500 mt-2">Loading your logos...</p>
      </div>
    );
  }

  if (logos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">No Logos Generated Yet</h2>
        <p className="text-gray-500">Start creating your first logo!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Generated Logos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {logos.map((logo) => (
          <div
            key={logo.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative aspect-square">
              <Image
                src={logo.imageUrl}
                alt="Generated Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500">
                {new Date(logo.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                {logo.prompt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
