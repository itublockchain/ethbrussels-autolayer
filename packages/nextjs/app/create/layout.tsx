const CreateOrderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="w-full h-[calc(100vh-40px)] bg-custom-pattern bg-cover bg-center">{children}</div>
    </>
  );
};

export default CreateOrderLayout;
