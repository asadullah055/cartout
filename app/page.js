import LogoImage from "@/public/images/001jpeg.jpeg";
import Image from "next/image";
export default function Home() {
  return (
    <main className="max-w-[1280px] mx-auto">
      <div className="flex flex-wrap ">
        <div className="w-[67%] p-1">
          <Image src={LogoImage} height={800} width={1600} alt="sjkld" />
        </div>
        <div className="w-[33%] p-1 flex flex-col justify-center items-center gap-2">
          <Image src={LogoImage} height={260} width={800} alt="sjkld" />
          <Image src={LogoImage} height={260} width={800} alt="sjkld" />
        </div>
      </div>
    </main>
  );
}
