import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "./Menu";
import { Navbar } from "./Navbar";

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
    <header className="bg-gray-100 pt-2 px-3 shadow-sm border-b-2">
      <section className="max-w-[1220px] items-center flex justify-between mx-auto">
        <div>
          <Menu />
          <Navbar />
        </div>

        <button
          onClick={handleLogout}
          type="button"
          disabled={loading}
          className="text-red-700 disabled:opacity-50 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-md text-sm px-5 py-1.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          Sair da conta
        </button>
      </section>
    </header>
  );
}
