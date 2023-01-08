import { createContext, ReactNode, useContext } from "react";

interface TokenContextProps {
  token: string;
  setSessionToken: (token: string) => void;
  setLocalToken: (token: string) => void;
  clearLocalToken: () => void;
  clearSessionToken: () => void;
}

const TokenContext = createContext({} as TokenContextProps);

interface TokenProviderProps {
  children: ReactNode;
}

export const TokenProvider = ({ children }: TokenProviderProps) => {
  const token = JSON.parse(
    (localStorage.getItem("@sharenergy-access_token") as string) ||
      (sessionStorage.getItem("@sharenergy-access_token") as string)
  );

  const setSessionToken = (token: string) =>
    sessionStorage.setItem("@sharenergy-access_token", JSON.stringify(token));
  const setLocalToken = (token: string) =>
    localStorage.setItem("@sharenergy-access_token", JSON.stringify(token));
  const clearLocalToken = () =>
    localStorage.removeItem("@sharenergy-access_token");
  const clearSessionToken = () =>
    sessionStorage.removeItem("@sharenergy-access_token");

  return (
    <TokenContext.Provider
      value={{
        setLocalToken,
        setSessionToken,
        token,
        clearLocalToken,
        clearSessionToken,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
