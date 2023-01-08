import * as DM from "@radix-ui/react-dropdown-menu";
import classNames from "classnames";
import { List } from "phosphor-react";
import { Link, useLocation } from "react-router-dom";
import styles from "./styles.module.css";

export function Menu() {
  const location = useLocation();

  return (
    <DM.Root>
      <DM.Trigger asChild className="md:hidden">
        <button className={styles.hamburguerBtn}>
          <List size={34} />
        </button>
      </DM.Trigger>

      <DM.Portal>
        <DM.Content className={styles.menuList}>
          <DM.Item
            className={classNames({
              [styles.activeMenuItem]: location.pathname === "/",
            })}
          >
            <Link to="/">Usuários</Link>
          </DM.Item>
          <DM.Item
            className={classNames({
              [styles.activeMenuItem]: location.pathname === "/cats",
            })}
          >
            <Link to="/cats">Gatos</Link>
          </DM.Item>
          <DM.Item
            className={classNames({
              [styles.activeMenuItem]: location.pathname === "/dogs",
            })}
          >
            <Link to="/dogs">Cachorros</Link>
          </DM.Item>
          <DM.Item
            className={classNames({
              [styles.activeMenuItem]: location.pathname === "/clients",
            })}
          >
            <Link to="/clients">Clientes</Link>
          </DM.Item>
        </DM.Content>
      </DM.Portal>
    </DM.Root>
  );
}
