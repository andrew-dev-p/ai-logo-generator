"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
const Hero = () => {
  const [input, setInput] = useState("");

  return (
    <div className="flex items-center mb-16 flex-col gap-4">
      <h2 className="text-4xl font-bold">AI Logo Generator</h2>
      <p className="text-lg">Generate a logo for your business with AI.</p>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Enter your logo name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button asChild>
          <Link href={`/create?title=${input}`}>Generate Logo</Link>
        </Button>
      </div>
    </div>
  );
};

export default Hero;
