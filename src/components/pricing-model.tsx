"use client";

import { Smile, Sparkle } from "lucide-react";
import HeadingDescription from "./ui/heading-description";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const PricingModel = ({
  formData,
  onInputChange,
}: {
  formData: {
    title: string;
    description: string;
    palette: string;
    design: string;
    pricing: string;
  };
  onInputChange: (field: string, value: string) => void;
}) => {
  const { user } = useUser();

  useEffect(() => {
    if (formData.title && typeof window !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  return (
    <div className="my-5">
      <HeadingDescription
        title="Pricing Model"
        description="Choose a pricing model"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Card className="flex items-center gap-2">
          <Smile />
          <p className="text-lg font-bold">Free</p>
          <ul className="list-disc list-inside">
            <li>30 second to 3 minutes wait time</li>
            <li>Limited quality</li>
            <li>Free</li>
          </ul>
          {user ? (
            <Button className="w-1/2 mt-4" asChild>
              <Link
                href="/generate-logo?type=free"
                onClick={() => onInputChange("pricing", "free")}
              >
                Choose Free
              </Link>
            </Button>
          ) : (
            <SignInButton
              mode="modal"
              forceRedirectUrl={"/generate-logo?type=free"}
            >
              <Button
                onClick={() => onInputChange("pricing", "free")}
                variant="outline"
                className="w-1/2 mt-4"
              >
                Choose Free
              </Button>
            </SignInButton>
          )}
        </Card>
        <Card className="flex items-center gap-2">
          <Sparkle />
          <p className="text-lg font-bold">Premium</p>
          <ul className="list-disc list-inside">
            <li>Less than 10 seconds wait time</li>
            <li>High quality</li>
            <li>Only 1 credit</li>
          </ul>
          {user ? (
            <Button className="w-1/2 mt-4" asChild>
              <Link
                href="/generate-logo?type=premium"
                onClick={() => onInputChange("pricing", "premium")}
              >
                Choose Premium
              </Link>
            </Button>
          ) : (
            <SignInButton
              mode="modal"
              forceRedirectUrl={"/generate-logo?type=premium"}
            >
              <Button
                className="w-1/2 mt-4"
                asChild
                onClick={() => onInputChange("pricing", "premium")}
              >
                Choose Premium
              </Button>
            </SignInButton>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PricingModel;
