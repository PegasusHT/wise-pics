import Image from "next/image";
import MainUI from "../components/MainUI";
import { Buffer } from "buffer";
globalThis.Buffer = Buffer;
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <div className="h-full">
      <div className="text-center flex flex-col justify-center items-center h-1/7 bg-slate-100 pt-4 py-2">

        <div className="flex justify-center items-center h-3/5 w-1/2">
          <div className="w-3/12 flex justify-end mr-2">
            <Image
              src="/favicon.ico"
              alt="WisePics Logo"
              width={80}
              height={100}
            />
          </div>
          <h1 className="flex justify-center items-center text-4xl md:text-6xl font-bold">
            WisePics
          </h1>
        </div>
        <p className="text-lg md:text-xl mb-2">
          AI Powered Text Recognition for Images
        </p>
      </div>

      <div className="flex justify-center h-[80%]">
        <MainUI />
      </div>

      <div className="flex justify-center h-1/7 bg-slate-100">
        <Footer />
      </div>

    </div>
  );
}
