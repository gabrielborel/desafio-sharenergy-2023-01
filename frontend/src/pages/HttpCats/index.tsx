import { api } from "../../api/axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import classNames from "classnames";
import { useState } from "react";
import { Spinner } from "../../components/icons/Spinner";
import { LOADING_SPEED, wait } from "../../helpers/Wait";
import styles from "./styles.module.css";
import { SearchIcon } from "../../components/icons/Search";

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
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");

  const IMAGE_FALLBACK =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLtVw6QIswway_twpH7QzU1sQbygSQeTAmIw&usqp=CAU";

  const handleFormSubmit: SubmitHandler<InputTypes> = async (data) => {
    const { statusCode } = data;
    setIsLoading(true);

    try {
      const token = JSON.parse(
        (localStorage.getItem("@sharenergy-access_token") as string) ||
          (sessionStorage.getItem("@sharenergy-access_token") as string)
      );

      const { data } = await api.get(`/cats/${statusCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      wait(LOADING_SPEED.FAST).then(() => {
        setImage(data);
        setIsLoading(false);
      });
    } catch (err) {
      wait(LOADING_SPEED.FAST).then(() => {
        setImage(IMAGE_FALLBACK);
        setError("statusCode", {
          message: "Nenhuma imagem encontrada com esse status code!",
        });
        setIsLoading(false);
      });
    }
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Gatos</h1>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-8">
        <p className={styles.description}>
          Digite um status code e receba uma imagem de um gato =)
        </p>
        <label htmlFor="default-search" className={styles.label}>
          Search
        </label>
        <div className={styles.inputContainer}>
          <SearchIcon />
          <input
            {...register("statusCode", { valueAsNumber: true })}
            type="text"
            className={classNames(styles.input, {
              [styles.inputError]: !!errors.statusCode,
            })}
            placeholder="Digite um status code"
          />
          <button
            disabled={isLoading}
            type="submit"
            className={styles.submitBtn}
          >
            {isLoading ? <Spinner /> : "Buscar"}
          </button>
        </div>

        {!!errors.statusCode && (
          <p className={styles.errorMessage}>
            <span className="font-medium">Erro! </span>
            {errors.statusCode.message}
          </p>
        )}
      </form>

      <img
        className={styles.catImage}
        src={
          image.startsWith("https") ? image : `data:image/png;base64,${image}`
        }
        alt=""
      />
    </section>
  );
}
