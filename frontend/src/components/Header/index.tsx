import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "../Menu";
import { Navbar } from "../Navbar";
import styles from "./styles.module.css";

export function Header() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    setLoading(true);
    localStorage.removeItem("@sharenergy-access_token");
    sessionStorage.removeItem("@sharenergy-access_token");

    setTimeout(() => {
      navigate("/auth");
    }, 1500);
  }

  return (
    <header className={styles.container}>
      <section className={styles.headerContent}>
        <div>
          <Menu />
          <Navbar />
        </div>

        <button
          onClick={handleLogout}
          type="button"
          disabled={loading}
          className={styles.logoutBtn}
        >
          Sair da conta
        </button>
      </section>
    </header>
  );
}
