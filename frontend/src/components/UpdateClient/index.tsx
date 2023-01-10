import * as D from "@radix-ui/react-dialog";
import { PencilSimple, X } from "phosphor-react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { Spinner } from "../icons/Spinner";
import { Client } from "../../pages/Clients";
import { LOADING_SPEED, wait } from "../../helpers/Wait";
import styles from "./styles.module.css";

const schema = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório",
    })
    .min(5, "Nome deve ter no mínimo 5 caracteres.")
    .max(30, "Nome deve ter no máximo 30 caracteres."),
  email: z
    .string({
      required_error: "Email é obrigatório",
    })
    .email({ message: "Email inválido" }),
  cellphone: z
    .string({ required_error: "Telefone é obrigatório" })
    .min(9, "Telefone deve ter no mínimo 9 dígitos")
    .max(11, "Telefone deve ter no máximo 11 dígitos"),
  cpf: z
    .string({ required_error: "CPF é obrigatório" })
    .length(11, { message: "CPF deve ter no 11 dígitos" }),
  address: z
    .string({
      required_error: "Endereço é obrigatório",
    })
    .min(10, "Endereço deve ter no mínimo 20 caracteres.")
    .max(70, "Endereço deve ter no máximo 70 caracteres."),
});

type InputTypes = z.infer<typeof schema>;

interface UpdateClientProps {
  handleOpenToast: (content: string, status: string) => void;
  handleCloseToast: () => void;
  handleSubstituteClient: (client: Client) => void;
  clientId: string;
}

export function UpdateClient({
  handleOpenToast,
  handleCloseToast,
  handleSubstituteClient,
  clientId,
}: UpdateClientProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    setValue,
  } = useForm<InputTypes>({ resolver: zodResolver(schema) });
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = JSON.parse(
    (localStorage.getItem("@sharenergy-access_token") as string) ||
      (sessionStorage.getItem("@sharenergy-access_token") as string)
  );

  api
    .get<Client>(`/clients/${clientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setValue("name", res.data.name);
      setValue("email", res.data.email);
      setValue("cpf", res.data.cpf);
      setValue("cellphone", res.data.cellphone);
      setValue("address", res.data.address);
    })
    .catch(console.log);

  async function handleUpdateClient(data: Client) {
    try {
      const res = await api.put(
        `/clients/${clientId}`,
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      wait(LOADING_SPEED.FAST).then(() => {
        handleOpenToast("Cliente atualizado com sucesso!", "success");
        setIsLoading(false);
        reset();
        handleSubstituteClient(res.data);

        wait(LOADING_SPEED.FAST).then(() => {
          handleCloseModal();

          wait(LOADING_SPEED.MEDIUM).then(() => handleCloseToast());
        });
      });
    } catch (err: any) {
      wait(LOADING_SPEED.FAST).then(() => {
        const errorField = err.response.data.message
          .split(" ")[0]
          .toLowerCase();
        const { message } = err.response.data;

        handleOpenToast(message, "error");
        setError(errorField, {
          message,
        });
      });
    }
  }

  const onSubmit: SubmitHandler<InputTypes> = (data) => {
    setIsLoading(true);

    handleUpdateClient(data);
  };

  function handleCloseModal() {
    setOpen(false);
    reset();
  }

  return (
    <D.Root open={open}>
      <D.Trigger asChild>
        <button
          onClick={() => setOpen(true)}
          type="button"
          className={styles.openModalBtn}
        >
          <PencilSimple size={18} />
          Editar
        </button>
      </D.Trigger>

      <D.Portal className={styles.modalRoot}>
        <D.Overlay onClick={handleCloseModal} className={styles.modalOverlay} />

        <D.Content asChild className={styles.modalContent}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <header className={styles.formHeader}>
              <D.Title className={styles.formTitle}>Editar Cliente</D.Title>
              <D.Close asChild>
                <button
                  className={styles.closeModalBtn}
                  onClick={handleCloseModal}
                >
                  <X size={20} weight="bold" />
                </button>
              </D.Close>
            </header>

            <main className="mt-4">
              <div className="mb-3">
                <label htmlFor="name" className={styles.inputLabel}>
                  Nome
                </label>
                {!!errors.name && (
                  <p className={styles.errorMessage}>
                    <span className="font-medium">Erro! </span>
                    {errors.name.message}
                  </p>
                )}
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  className={classNames(styles.input, {
                    [styles.inputError]: !!errors.name,
                  })}
                  placeholder="Digite o nome"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className={styles.inputLabel}>
                  Email
                </label>
                {!!errors.email && (
                  <p className={styles.errorMessage}>
                    <span className="font-medium">Erro! </span>
                    {errors.email.message}
                  </p>
                )}
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className={classNames(styles.input, {
                    [styles.inputError]: !!errors.email,
                  })}
                  placeholder="Digite o email"
                />
              </div>
              <div className="flex gap-4">
                <div className="mb-3">
                  <label htmlFor="cellphone" className={styles.inputLabel}>
                    Telefone
                  </label>
                  {!!errors.cellphone && (
                    <p className={styles.errorMessage}>
                      <span className="font-medium">Erro! </span>
                      {errors.cellphone.message}
                    </p>
                  )}
                  <input
                    {...register("cellphone")}
                    type="text"
                    id="cellphone"
                    className={classNames(styles.input, {
                      [styles.inputError]: !!errors.cellphone,
                    })}
                    placeholder="Digite o telefone"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="cpf" className={styles.inputLabel}>
                    CPF
                  </label>
                  {!!errors.cpf && (
                    <p className={styles.errorMessage}>
                      <span className="font-medium">Erro! </span>
                      {errors.cpf.message}
                    </p>
                  )}
                  <input
                    {...register("cpf")}
                    type="text"
                    id="cpf"
                    className={classNames(styles.input, {
                      [styles.inputError]: !!errors.cpf,
                    })}
                    placeholder="Digite o CPF"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="address" className={styles.inputLabel}>
                  Endereço
                </label>
                {!!errors.address && (
                  <p className={styles.errorMessage}>
                    <span className="font-medium">Erro! </span>
                    {errors.address.message}
                  </p>
                )}
                <textarea
                  {...register("address")}
                  id="address"
                  rows={2}
                  className={classNames(styles.textarea, {
                    [styles.textareaError]: !!errors.address,
                  })}
                  placeholder="Digite o endereço"
                ></textarea>
              </div>
            </main>
            <footer className="mt-4">
              <button type="submit" className={styles.submitBtn}>
                {isLoading ? <Spinner /> : "Salvar"}
              </button>
            </footer>
          </form>
        </D.Content>
      </D.Portal>
    </D.Root>
  );
}
