import { ArrowClockwise } from "phosphor-react";
import { useState } from "react";
import { api } from "../api/axios";
import { Spinner } from "../components/Spinner";

export function RandomDogs() {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");

  function fetchRandomDogImage() {
    setIsLoading(true);
    api
      .get("https://random.dog/woof?filter=mp4,webm")
      .then((res) => {
        setTimeout(() => {
          setImage(res.data);
          setIsLoading(false);
        }, 1500);
      })
      .catch(console.error);
  }

  return (
    <section className="min-h-[540px] max-w-[440px] mx-auto">
      <h1 className="my-3 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white text-center">
        Random Dogs
      </h1>

      <p className="text-base text-gray-900 dark:text-white mb-2">
        Clique no botão para gerar uma imagem de um cachorro =)
      </p>

      <button
        disabled={isLoading}
        onClick={fetchRandomDogImage}
        type="button"
        className="text-white bg-green-700 disabled:opacity-50 hover:not:disabled:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-md text-base px-5 py-2 text-center flex gap-2 mt-8 items-center mx-auto min-w-[180px] justify-evenly"
      >
        {isLoading ? <Spinner /> : <ArrowClockwise weight="bold" size={18} />}
        Gerar imagem
      </button>

      <img
        className="w-full rounded-sm mt-8"
        src={`https://random.dog/${image}`}
        alt=""
      />
    </section>
  );
}
