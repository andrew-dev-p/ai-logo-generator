"use client";

import Header from "@/components/header";
import { UserContext, UserData } from "@/context/user-context";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  const [userData, setUserData] = useState<UserData | null>(null);

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
    setUserData(res.data);
  };

  return (
    <div>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <div className="my-4 px-10 lg:px-32 xl:px-48 2xl:px-56 min-h-screen flex items-center justify-center">
          {children}
        </div>
      </UserContext.Provider>
    </div>
  );
};

export default Provider;
