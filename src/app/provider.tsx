"use client";

import Header from "@/components/header";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      checkUserAuth();
    }
  }, [user]);

  const checkUserAuth = async () => {
    const res = await axios.post("/api/users", {
      userEmail: user?.emailAddresses[0].emailAddress,
      userName: user?.fullName,
    });
    console.log(res);
  };

  return (
    <div>
      <Header />
      <div className="my-4 px-10 lg:px-32 xl:px-48 2xl:px-56 min-h-screen flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default Provider;
