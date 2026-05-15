import { fontSecondary } from "@/utils/font";
import Image from "next/image";
import { LoginForm } from "./components";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center  rounded-md mx-auto w-md  h-fit px-7 py-10  bg-white my-16 ">
      <div className="flex flex-col justify-center items-center gap-3 w-full">
        <div className="relative w-14 h-14 mt-5">
          <Image
            src="/logo.svg"
            alt="Logo Corporativo"
            fill
            className="absolute"
          />
        </div>
        <h2
          className={`${fontSecondary.className} antialiased text-4xl font-medium italic`}
        >
          Distiller
        </h2>
        <p className="uppercase text-xs tracking-wide text-[#8A8A8A] text-center ">
          Ai content pipeline
          <span className="block pt-1">by talentcircle</span>
        </p>

        <LoginForm />
      </div>
    </div>
  );
}
