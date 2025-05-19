import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userEmail, userName } = await req.json();

    if (!userEmail || !userName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const docRef = doc(db, "users", userEmail);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json(docSnap.data());
    } else {
      const data = {
        name: userName,
        email: userEmail,
        credits: 5,
      };

      await setDoc(doc(db, "users", userEmail), { ...data });
      return NextResponse.json({
        success: true,
        message: "User created successfully",
        data,
      });
    }
  } catch (error) {
    console.error("Error in /api/users:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
