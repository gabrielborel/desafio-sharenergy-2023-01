import * as DM from "@radix-ui/react-dropdown-menu";
import classNames from "classnames";
import { List } from "phosphor-react";
import { Link, useLocation } from "react-router-dom";

export function Menu() {
  const location = useLocation();

  return (
    <DM.Root>
      <DM.Trigger asChild className="md:hidden">
        <button className="hover:text-green-500 transition-colors">
          <List size={34} />
        </button>
      </DM.Trigger>

      <DM.Portal>
        <DM.Content className="md:hidden min-w-[150px] p-3 rounded-md bg-white shadow-md">
          <DM.Item
            className={classNames({
              "text-green-600": location.pathname === "/",
            })}
          >
            <Link to="/">Usuários</Link>
          </DM.Item>
          <DM.Item
            className={classNames({
              "text-green-600": location.pathname === "/cats",
            })}
          >
            <Link to="/cats">Gatos</Link>
          </DM.Item>
          <DM.Item
            className={classNames({
              "text-green-600": location.pathname === "/dogs",
            })}
          >
            <Link to="/dogs">Cachorros</Link>
          </DM.Item>
          <DM.Item
            className={classNames({
              "text-green-600": location.pathname === "/clients",
            })}
          >
            <Link to="/clients">Clientes</Link>
          </DM.Item>
        </DM.Content>
      </DM.Portal>
    </DM.Root>
  );
}
