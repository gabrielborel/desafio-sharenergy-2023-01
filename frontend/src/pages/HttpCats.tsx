import { api } from "../api/axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import classNames from "classnames";
import { Buffer } from "buffer";
import { useState } from "react";

const schema = z.object({
  statusCode: z.number({
    required_error: "Status code é obrigatório.",
    invalid_type_error: "Status code deve ser um número.",
  }),
});

type InputTypes = z.infer<typeof schema>;

export function HttpCats() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<InputTypes>({ resolver: zodResolver(schema) });
  const [image, setImage] = useState("");

  const handleFormSubmit: SubmitHandler<InputTypes> = (data) => {
    const { statusCode } = data;

    api
      .get(`https://http.cat/${statusCode}`, { responseType: "arraybuffer" })
      .then((res) => {
        const imageBuffer = Buffer.from(res.data, "utf-8");
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(imageBuffer))
        );
        setImage(base64String);
      })
      .catch(() => {
        setImage(
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLtVw6QIswway_twpH7QzU1sQbygSQeTAmIw&usqp=CAU"
        );
        setError("statusCode", {
          message: "Nenhuma imagem encontrada com esse status code!",
        });
      });
  };

  return (
    <section className="min-h-[540px] max-w-[440px] mx-auto">
      <h1 className="my-3 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white text-center">
        Http Cats
      </h1>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-8">
        <p className="text-base text-gray-900 dark:text-white mb-2">
          Digite um status code e receba uma imagem de um gato =)
        </p>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            {...register("statusCode", { valueAsNumber: true })}
            type="text"
            className={classNames(
              "block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500",
              {
                "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-4 pl-10 dark:bg-red-100 dark:border-red-400":
                  !!errors.statusCode,
              }
            )}
            placeholder="Digite um status code"
          />
          <button
            type="submit"
            className=" text-white absolute right-2.5 bottom-2.5 bg-green-700 disabled:opacity-50 hover:not:disabled:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Buscar
          </button>
        </div>

        {!!errors.statusCode && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            <span className="font-medium">Erro! </span>
            {errors.statusCode.message}
          </p>
        )}
      </form>

      <img
        className="w-full rounded-sm mt-4"
        src={
          image.startsWith("https") ? image : `data:image/png;base64,${image}`
        }
        alt=""
      />
    </section>
  );
}
