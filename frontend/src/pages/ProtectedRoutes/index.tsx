import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Header } from "../../components/Header";
import styles from "./styles.module.css";

interface TokenInfo {
  exp: number;
}

export function Protected() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = JSON.parse(
      (localStorage.getItem("@sharenergy-access_token") as string) ||
        (sessionStorage.getItem("@sharenergy-access_token") as string)
    );

    if (!token) {
      return navigate("/auth");
    }

    const decodedToken: TokenInfo = jwtDecode(token);
    const expiresDate = new Date(decodedToken.exp * 1000).getTime();
    const today = new Date().getTime();
    const tokenExpired = today > expiresDate;

    if (tokenExpired) {
      localStorage.removeItem("@sharenergy-access_token");
      sessionStorage.removeItem("@sharenergy-access_token");
      return navigate("/auth");
    }
  }, []);

  return (
    <main className={styles.container}>
      <Header />

      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </main>
  );
}
