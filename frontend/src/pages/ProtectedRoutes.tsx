import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

interface TokenInfo {
  exp: number;
}

export function Protected() {
  const navigate = useNavigate();

  useEffect(() => {
    const localToken =
      JSON.parse(localStorage.getItem("@sharenergy-access_token") as string) ||
      "";
    const sessionToken =
      JSON.parse(
        sessionStorage.getItem("@sharenergy-access_token") as string
      ) || "";

    if (!localToken && !sessionToken) {
      return navigate("/auth");
    }

    const token: TokenInfo = jwtDecode(localToken || sessionToken);
    const expiresDate = new Date(token.exp * 1000).getTime();
    const today = new Date().getTime();
    const tokenExpired = today > expiresDate;

    if (tokenExpired) {
      localStorage.removeItem("@sharenergy-access_token");
      sessionStorage.removeItem("@sharenergy-access_token");
      return navigate("/auth");
    }

    return navigate("/");
  }, []);

  return <Outlet />;
}
