"use client";

import LogoTitle from "@/components/logo-title";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useMemo, useCallback } from "react";
import LogoDescription from "@/components/logo-description";
import LogoPalette from "@/components/logo-palette";
import LogoDesign from "@/components/logo-design";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import colors from "@/lib/colors";
import logoDesigns from "@/lib/logo-designs";
import PricingModel from "@/components/pricing-model";
const Create = () => {
  const [step, setStep] = useState(1);

  const title = useSearchParams().get("title") || "";

  const [formData, setFormData] = useState({
    title,
    description: "",
    palette: colors[0].name,
    design: logoDesigns[0].title,
    pricing: "",
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
      <PricingModel
        key="pricing"
        onInputChange={onInputChange}
        formData={formData}
      />,
    ],
    [formData, onInputChange]
  );

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
        <Button className="ml-auto" onClick={() => setStep(step + 1)}>
          Next
          <ArrowRight />
        </Button>
      </div>
    </Card>
  );
};

export default Create;
