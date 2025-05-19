"use client";

import { UserContext } from "@/context/user-context";
import { useContext } from "react";

const GenerateLogo = () => {
  const { userData } = useContext(UserContext);

  return <div>{userData?.name}</div>;
};

export default GenerateLogo;
