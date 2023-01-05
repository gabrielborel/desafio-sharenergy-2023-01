import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

export function Navbar() {
  const location = useLocation();

  return (
    <div className="hidden md:block text-sm font-medium text-center text-gray-500 dark:text-gray-400">
      <ul className="flex flex-wrap -mb-px">
        <li className="mr-2">
          <Link
            to="/"
            className={classNames(
              "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300",
              {
                "inline-block p-4 text-green-600 border-b-2 border-green-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500":
                  location.pathname === "/",
              }
            )}
          >
            Usuários
          </Link>
        </li>
        <li className="mr-2">
          <Link
            to="/cats"
            className={classNames(
              "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300",
              {
                "inline-block p-4 text-green-600 border-b-2 border-green-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500":
                  location.pathname === "/cats",
              }
            )}
          >
            Gatos
          </Link>
        </li>
        <li className="mr-2">
          <Link
            to="/dogs"
            className={classNames(
              "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300",
              {
                "inline-block p-4 text-green-600 border-b-2 border-green-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500":
                  location.pathname === "/dogs",
              }
            )}
          >
            Cachorros
          </Link>
        </li>
        <li className="mr-2">
          <Link
            to="/clients"
            className={classNames(
              "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300",
              {
                "inline-block p-4 text-green-600 border-b-2 border-green-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500":
                  location.pathname === "/clients",
              }
            )}
          >
            Clientes
          </Link>
        </li>
      </ul>
    </div>
  );
}
