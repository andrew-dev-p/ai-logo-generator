import HeadingDescription from "./ui/heading-description";
import colors from "@/lib/colors";

const LogoPalette = ({
  inputValue,
  onInputChange,
}: {
  inputValue: string;
  onInputChange: (field: string, value: string) => void;
}) => {
  return (
    <div className="my-5">
      <HeadingDescription
        title="Logo Palette"
        description="Select a palette for your logo"
      />
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {colors.map((palette) => (
          <div
            key={palette.name}
            className={`flex cursor-pointer hover:opacity-80 transition duration-400 rounded-md overflow-hidden ${
              inputValue === palette.name
                ? "ring-2 ring-neutral-600 ring-offset-2 scale-[0.98]"
                : ""
            }`}
          >
            {palette.colors.map((color) => (
              <div
                onClick={() => onInputChange("palette", palette.name)}
                key={color}
                className="h-24 w-full"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoPalette;
