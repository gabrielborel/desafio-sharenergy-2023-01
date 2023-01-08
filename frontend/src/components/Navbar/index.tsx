import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import styles from "./styles.module.css";

export function Navbar() {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <ul className={styles.navList}>
        <li>
          <Link
            to="/"
            className={classNames(styles.navItem, {
              [styles.activeNavItem]: location.pathname === "/",
            })}
          >
            Usuários
          </Link>
        </li>
        <li>
          <Link
            to="/cats"
            className={classNames(styles.navItem, {
              [styles.activeNavItem]: location.pathname === "/cats",
            })}
          >
            Gatos
          </Link>
        </li>
        <li>
          <Link
            to="/dogs"
            className={classNames(styles.navItem, {
              [styles.activeNavItem]: location.pathname === "/dogs",
            })}
          >
            Cachorros
          </Link>
        </li>
        <li>
          <Link
            to="/clients"
            className={classNames(styles.navItem, {
              [styles.activeNavItem]: location.pathname === "/clients",
            })}
          >
            Clientes
          </Link>
        </li>
      </ul>
    </div>
  );
}
