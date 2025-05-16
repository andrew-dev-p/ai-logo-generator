import Header from "@/components/header";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="my-4 px-10 lg:px-32 xl:px-48 2xl:px-56 min-h-screen flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default Provider;
