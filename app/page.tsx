import Image from "next/image";
import Question from "./components/Question";

export default function Home() {
  return (
    <div className="w-full h-screen relative">
      <div className="absolute inset-0 bg-black bg-opacity-50 items-start justify-center pt-10 ">
        <div className="text-white text-center h-1/5 ">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            WisePics
          </h1>
          <p className="text-lg md:text-xl mb-8">
            AI powered text recognition for images
          </p>
        </div>

        <div className="flex justify-center pt-16">
          <Question />
        </div>
      </div>
    </div>
  );
}
