import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Hero = () => {
  return (
    <div className="flex items-center mt-32 flex-col gap-4">
      <h2 className="text-4xl font-bold">AI Logo Generator</h2>
      <p className="text-lg">Generate a logo for your business with AI.</p>
      <div className="flex items-center gap-2">
        <Input placeholder="Enter your logo name" />
        <Button>Generate Logo</Button>
      </div>
    </div>
  );
};

export default Hero;
