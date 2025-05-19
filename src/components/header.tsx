"use client";

import { Squirrel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";

const Header = () => {
  const { user } = useUser();

  return (
    <div className="px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-2">
        <Squirrel />
        <h1 className="text-2xl font-bold">AI Logo Generator</h1>
      </div>
      <div className="flex items-center gap-2">
        {user && <Button variant="outline">Dashboard</Button>}
        <Button>Get Started</Button>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
