import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import classNames from "classnames";
import { Eye, EyeSlash } from "phosphor-react";
import { Spinner } from "../components/Spinner";
import { Toast } from "../components/Toast";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";

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
    formState: { errors, isValid, submitCount },
  } = useForm<InputTypes>({ resolver: zodResolver(schema) });
  const [showPassword, toggleShowPassword] = useState(false);
  const [onSubmitLoading, setOnSubmitLoading] = useState(false);
  const [openToast, setOpenToast] = useState({
    open: false,
    status: "",
    content: "",
  });

  const navigate = useNavigate();

  const handleCloseToast = () =>
    setOpenToast({
      open: false,
      status: "success",
      content: "Autenticado com sucesso! Você será redirecionado =)",
    });

  const authFormSubmit: SubmitHandler<InputTypes> = async (data) => {
    setOnSubmitLoading(true);

    console.log(data);

    setTimeout(async () => {
      try {
        const {
          data: { token },
        } = await api.post("/authenticate", {
          ...data,
        });

        if (data.rememberMe) {
          localStorage.setItem(
            "@sharenergy-access_token",
            JSON.stringify(token)
          );
        } else {
          sessionStorage.setItem(
            "@sharenergy-access_token",
            JSON.stringify(token)
          );
          localStorage.removeItem("@sharenergy-access_token");
        }

        setOpenToast({
          open: true,
          status: "success",
          content: "Autenticado com sucesso! Você será redirecionado =)",
        });

        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (err: any) {
        setOpenToast({
          open: true,
          status: "error",
          content: err.response.data.message,
        });
      }

      setOnSubmitLoading(false);
    }, 1200);

    setTimeout(() => {
      setOpenToast((state) => ({ ...state, open: false }));
    }, 5000);
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-10 -mt-12">
      <Toast
        open={openToast.open}
        onClose={handleCloseToast}
        content={openToast.content}
        status={openToast.status}
      />

      <img
        src="https://www.sharenergy.com.br/wp-content/uploads/2022/12/logo_color.png"
        className="w-[260px] h-8 sm:w-[300px] sm:h-12 md:w-[400px] md:h-16"
        alt=""
      />

      <form
        onSubmit={handleSubmit(authFormSubmit)}
        className="max-w-[450px] w-full mx-auto px-2"
      >
        <div className="mb-6">
          <label
            htmlFor="username"
            className={classNames(
              "block mb-2 text-sm md:text-base font-medium text-gray-900 dark:text-white",
              {
                "block mb-2 text-sm font-medium text-red-700 dark:text-red-500":
                  !!errors.username,
              }
            )}
          >
            Nome de usuário
          </label>
          <input
            type="username"
            id="username"
            {...register("username")}
            className={classNames(
              "bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 shadow-sm",
              {
                "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400":
                  !!errors.username,
              }
            )}
            placeholder="Digite seu nome de usuário"
            required
          />
          {!!errors.username && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Erro! </span>
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className={classNames(
              "block mb-2 text-sm md:text-base font-medium text-gray-900 dark:text-white",
              {
                "block mb-2 text-sm font-medium text-red-700 dark:text-red-500":
                  !!errors.password,
              }
            )}
          >
            Senha
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password")}
              className={classNames(
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm md:text-base rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 shadow-sm",
                {
                  "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400":
                    !!errors.password,
                }
              )}
              placeholder="Digite sua senha"
              required
            />
            <button
              type="button"
              onClick={() => toggleShowPassword((state) => !state)}
              className="absolute right-5 top-[30%] opacity-50 hover:opacity-70 transition-opacity"
            >
              {showPassword ? <Eye size={19} /> : <EyeSlash size={19} />}
            </button>
          </div>
          {!!errors.password && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Erro! </span>
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              {...register("rememberMe")}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-sm md:text-base font-medium text-gray-900 dark:text-gray-300"
          >
            Manter conectado
          </label>
        </div>
        <button
          disabled={(!isValid && submitCount > 1) || onSubmitLoading}
          type="submit"
          className="flex items-center justify-center text-white bg-green-500 disabled:opacity-70 disabled:cursor-not-allowed not:disabled:hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm md:text-base w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:not:disabled:hover:bg-green-700 dark:focus:ring-green-800 transition-colors"
        >
          {onSubmitLoading && <Spinner />}
          Entrar
        </button>
      </form>
    </div>
  );
}
