import { Smile, Sparkle } from "lucide-react";
import HeadingDescription from "./ui/heading-description";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const PricingModel = ({
  onInputChange,
}: {
  onInputChange: (field: string, value: string) => void;
}) => {
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
          <Button
            onClick={() => onInputChange("pricing", "free")}
            variant="outline"
            className="w-1/2 mt-4"
          >
            Choose Free
          </Button>
        </Card>
        <Card className="flex items-center gap-2">
          <Sparkle />
          <p className="text-lg font-bold">Premium</p>
          <ul className="list-disc list-inside">
            <li>Less than 10 seconds wait time</li>
            <li>High quality</li>
            <li>Only 1 credit</li>
          </ul>
          <Button
            onClick={() => onInputChange("pricing", "premium")}
            className="w-1/2 mt-4"
          >
            Choose Premium
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default PricingModel;
