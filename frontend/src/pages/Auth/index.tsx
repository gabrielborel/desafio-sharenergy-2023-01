import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import classNames from "classnames";
import { Eye, EyeSlash } from "phosphor-react";
import { Spinner } from "../../components/icons/Spinner";
import { Toast } from "../../components/Toast";
import { api } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useToken } from "../../contexts/TokenContext";
import styles from "./styles.module.css";
import { LOADING_SPEED, wait } from "../../helpers/Wait";

const schema = z.object({
  username: z
    .string({ required_error: "Nome de usuário é obrigatório" })
    .min(5, "Nome de usuário deve ter no mínimo 5 caracteres.")
    .max(25, "Nome de usuário deve ter no máximo 25 caracteres."),
  password: z
    .string({ required_error: "Senha é obrigatório" })
    .min(8, "Senha deve ter no mínimo 8 caracteres.")
    .max(16, "Senha deve ter no máximo 16 caracteres."),
  rememberMe: z.boolean().default(false),
});

type InputTypes = z.infer<typeof schema>;

export function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputTypes>({ resolver: zodResolver(schema) });
  const [showPassword, toggleShowPassword] = useState(false);
  const [onSubmitLoading, setOnSubmitLoading] = useState(false);
  const [openToast, setOpenToast] = useState({
    open: false,
    status: "",
    content: "",
  });
  const { setLocalToken, setSessionToken, clearLocalToken } = useToken();

  const navigate = useNavigate();

  const handleCloseToast = () =>
    setOpenToast({
      open: false,
      status: "success",
      content: "Autenticado com sucesso! Você será redirecionado =)",
    });

  const authFormSubmit: SubmitHandler<InputTypes> = async (data) => {
    setOnSubmitLoading(true);

    wait(LOADING_SPEED.FAST).then(async () => {
      try {
        const {
          data: { token },
        } = await api.post("/authenticate", {
          ...data,
        });

        if (data.rememberMe) {
          setLocalToken(token);
        } else {
          setSessionToken(token);
          clearLocalToken();
        }

        setOpenToast({
          open: true,
          status: "success",
          content: "Autenticado com sucesso! Você será redirecionado =)",
        });

        wait(LOADING_SPEED.MEDIUM).then(() => {
          navigate("/");
        });
      } catch (err: any) {
        setOpenToast({
          open: true,
          status: "error",
          content: err.response.data.message,
        });
      }

      setOnSubmitLoading(false);
    });

    wait(5000).then(() => setOpenToast((state) => ({ ...state, open: false })));
  };

  return (
    <div className={styles.container}>
      <Toast
        open={openToast.open}
        onClose={handleCloseToast}
        content={openToast.content}
        status={openToast.status}
      />

      <img
        src="https://www.sharenergy.com.br/wp-content/uploads/2022/12/logo_color.png"
        className={styles.logo}
        alt="Logo Sharenergy"
      />

      <form onSubmit={handleSubmit(authFormSubmit)} className={styles.authForm}>
        <div className="mb-6">
          <label
            htmlFor="username"
            className={classNames(styles.inputLabel, {
              [styles.inputLabelError]: !!errors.username,
            })}
          >
            Nome de usuário
          </label>
          <input
            type="username"
            id="username"
            {...register("username")}
            className={classNames(styles.input, {
              [styles.inputError]: !!errors.username,
            })}
            placeholder="Digite seu nome de usuário"
          />
          {!!errors.username && (
            <p className={styles.errorMessage}>
              <span className="font-medium">Erro! </span>
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className={classNames(styles.inputLabel, {
              [styles.inputLabelError]: !!errors.username,
            })}
          >
            Senha
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password")}
              className={classNames(styles.input, {
                [styles.inputError]: !!errors.password,
              })}
              placeholder="Digite sua senha"
            />
            <button
              type="button"
              onClick={() => toggleShowPassword((state) => !state)}
              className={styles.showPasswordBtn}
            >
              {showPassword ? <Eye size={19} /> : <EyeSlash size={19} />}
            </button>
          </div>
          {!!errors.password && (
            <p className={styles.errorMessage}>
              <span className="font-medium">Erro! </span>
              {errors.password.message}
            </p>
          )}
        </div>

        <div className={styles.rememberMeContainer}>
          <input
            id="remember"
            type="checkbox"
            {...register("rememberMe")}
            className={styles.rememberMeInput}
          />
          <label htmlFor="remember" className={styles.rememberMeLabel}>
            Manter conectado
          </label>
        </div>

        <button type="submit" className={styles.submitBtn}>
          {onSubmitLoading ? <Spinner /> : "Entrar"}
        </button>
      </form>
    </div>
  );
}
