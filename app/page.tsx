import Image from "next/image";
import MainUI from "../components/MainUI";
import { Buffer } from "buffer";
globalThis.Buffer = Buffer;

export default function Home() {
  return (
    <div className="">
      <div className="absolute inset-0 bg-black bg-opacity-50 items-start justify-center pt-10 ">
        <div className="text-white text-center h-1/7">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            WisePics
          </h1>
          <p className="text-lg md:text-xl mb-8">
            AI powered text recognition for images
          </p>
        </div>

        <div className="flex justify-center h-5/6 ">
          <MainUI />
        </div>
      </div>
    </div>
  );
}
