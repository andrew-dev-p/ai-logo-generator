"use client";

import LogoTitle from "@/components/logo-title";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useMemo, useCallback, useEffect } from "react";
import LogoDescription from "@/components/logo-description";
import LogoPalette from "@/components/logo-palette";
import LogoDesign from "@/components/logo-design";
import { Card } from "@/components/ui/card";
import { useSearchParams, useRouter } from "next/navigation";
import colors from "@/lib/colors";
import logoDesigns from "@/lib/logo-designs";
import { SignInButton, useUser } from "@clerk/nextjs";

const Create = () => {
  const router = useRouter();
  const { user } = useUser();

  const [step, setStep] = useState(1);

  const title = useSearchParams().get("title") || "";

  const [formData, setFormData] = useState({
    title,
    description: "",
    palette: colors[0].name,
    design: logoDesigns[0].title,
  });

  const onInputChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const stepComponents = useMemo(
    () => [
      <LogoTitle
        key="title"
        onInputChange={onInputChange}
        inputValue={formData.title}
      />,
      <LogoDescription
        key="description"
        onInputChange={onInputChange}
        inputValue={formData.description}
      />,
      <LogoPalette
        key="palette"
        onInputChange={onInputChange}
        inputValue={formData.palette}
      />,
      <LogoDesign
        key="design"
        onInputChange={onInputChange}
        inputValue={formData.design}
      />,
    ],
    [formData, onInputChange]
  );

  useEffect(() => {
    if (formData.title && typeof window !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [formData]);

  return (
    <Card className="w-full px-8 py-5">
      {stepComponents[step - 1]}
      <div className="flex justify-between items-center">
        {step > 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            <ArrowLeft />
            Previous
          </Button>
        )}
        {user ? (
          <Button
            className="ml-auto"
            onClick={() => {
              if (step === stepComponents.length) {
                router.push(`/generate-logo`);
              } else {
                setStep(step + 1);
              }
            }}
          >
            Next
            <ArrowRight />
          </Button>
        ) : (
          <SignInButton mode="modal" forceRedirectUrl={"/create"}>
            <Button
              className="ml-auto"
              onClick={() => {
                if (step === stepComponents.length) {
                  router.push(`/generate-logo`);
                } else {
                  setStep(step + 1);
                }
              }}
            >
              Next
              <ArrowRight />
            </Button>
          </SignInButton>
        )}
      </div>
    </Card>
  );
};

export default Create;
