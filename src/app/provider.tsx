import Header from "@/components/header";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="px-10 lg:px-32 xl:px-48 2xl:px-56 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default Provider;
