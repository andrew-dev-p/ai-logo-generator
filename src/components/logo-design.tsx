import logoDesigns from "@/lib/logo-designs";
import HeadingDescription from "./ui/heading-description";
import Image from "next/image";
import { cn } from "@/lib/utils";

const LogoDesign = ({
  inputValue,
  onInputChange,
}: {
  inputValue: string;
  onInputChange: (field: string, value: string) => void;
}) => {
  return (
    <div className="my-5">
      <HeadingDescription
        title="Logo Title"
        description="Add a title to your logo"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {logoDesigns.map((design) => (
          <div
            onClick={() => onInputChange("design", design.title)}
            key={design.title}
            className={cn(
              "relative rounded-md overflow-hidden cursor-pointer group transition",
              inputValue === design.title &&
                "ring-2 ring-neutral-600 ring-offset-2"
            )}
          >
            <Image
              src={design.image}
              alt={design.title}
              width={100}
              height={100}
              className="w-full h-full object-cover group-hover:scale-105 transition"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 group-hover:bg-black/40 transition flex items-center justify-center">
              <p className="text-xs text-white text-center font-bold uppercase">
                {design.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoDesign;
