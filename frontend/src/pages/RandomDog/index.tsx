import { ArrowClockwise } from "phosphor-react";
import { useState } from "react";
import { api } from "../../api/axios";
import { Spinner } from "../../components/icons/Spinner";
import { LOADING_SPEED, wait } from "../../helpers/Wait";
import styles from "./styles.module.css";

export function RandomDogs() {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");

  async function fetchRandomDogImage() {
    const token = JSON.parse(
      (localStorage.getItem("@sharenergy-access_token") as string) ||
        (sessionStorage.getItem("@sharenergy-access_token") as string)
    );
    setIsLoading(true);

    const res = await api.get("/dogs", {
      headers: { Authorization: `Bearer ${token}` },
    });

    wait(LOADING_SPEED.FAST).then(() => {
      setImage(res.data);
      setIsLoading(false);
    });
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Cachorros</h1>

      <p className={styles.description}>
        Clique no botão para gerar uma imagem de um cachorro =)
      </p>

      <button
        disabled={isLoading}
        onClick={fetchRandomDogImage}
        type="button"
        className={styles.imageBtn}
      >
        {isLoading ? <Spinner /> : <ArrowClockwise weight="bold" size={18} />}
        Gerar imagem
      </button>

      <img
        className={styles.dogImage}
        src={`https://random.dog/${image}`}
        alt=""
      />
    </section>
  );
}
