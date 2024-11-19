import Image from "next/image";

const Logo = () => {
  return (
    <div className="mb-8 flex items-center">
      <Image src="/logo.svg" alt="" width={39} height={39} />
      <h1 className="ms-3 text-2xl font-bold">agiFinance</h1>
    </div>
  );
};

export default Logo;
