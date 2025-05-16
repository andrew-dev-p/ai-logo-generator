const HeadingDescription = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default HeadingDescription;
