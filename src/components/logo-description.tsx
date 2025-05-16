import HeadingDescription from "./ui/heading-description";
import { Input } from "./ui/input";

const LogoDescription = ({
  inputValue,
  onInputChange,
}: {
  inputValue: string;
  onInputChange: (field: string, value: string) => void;
}) => {
  return (
    <div className="my-5">
      <HeadingDescription
        title="Logo Description"
        description="Add a description to your logo"
      />
      <Input
        className="mt-4"
        placeholder="Enter your logo description"
        value={inputValue}
        onChange={(e) => onInputChange("description", e.target.value)}
      />
    </div>
  );
};

export default LogoDescription;
