import HeadingDescription from "./ui/heading-description";
import { Input } from "./ui/input";

const LogoTitle = ({
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
      <Input
        className="mt-4"
        placeholder="Enter your logo title"
        value={inputValue}
        onChange={(e) => onInputChange("title", e.target.value)}
      />
    </div>
  );
};

export default LogoTitle;
