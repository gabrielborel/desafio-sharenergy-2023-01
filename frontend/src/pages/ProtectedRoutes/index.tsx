import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { Header } from "../../components/Header";
import { useToken } from "../../contexts/TokenContext";
import styles from "./styles.module.css";

interface TokenInfo {
  exp: number;
}

export function Protected() {
  const navigate = useNavigate();
  const { token, clearLocalToken, clearSessionToken } = useToken();

  useEffect(() => {
    if (!token) {
      return navigate("/auth");
    }

    const decodedToken: TokenInfo = jwtDecode(token);
    const expiresDate = new Date(decodedToken.exp * 1000).getTime();
    const today = new Date().getTime();
    const tokenExpired = today > expiresDate;

    if (tokenExpired) {
      clearLocalToken();
      clearSessionToken();
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
