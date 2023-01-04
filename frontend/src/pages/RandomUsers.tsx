import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { Pagination } from "../components/Pagination";
import { UserCard } from "../components/UserCard";

export interface User {
  name: {
    first: string;
    last: string;
  };
  login: {
    username: string;
  };
  email: string;
  registered: {
    age: string;
  };
  picture: {
    medium: string;
  };
}

export function RandomUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<"name" | "username" | "email">("name");
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get("https://randomuser.me/api/?results=52")
      .then((res) => setUsers(res.data.results));
  }, []);

  function onPageChange(page: number) {
    setCurrentPage(page);
  }

  const filteredUsers: User[] = [];
  switch (filter) {
    case "name":
      for (const user of users) {
        const name = `${user.name.first} ${user.name.last}`;
        if (name.includes(search)) filteredUsers.push(user);
      }
      break;
    case "email":
      for (const user of users) {
        if (user.email.includes(search)) filteredUsers.push(user);
      }
      break;
    case "username":
      for (const user of users) {
        if (user.login.username.includes(search)) filteredUsers.push(user);
      }
      break;
  }

  const beginIndex = (currentPage - 1) * 6;
  const endIndex = currentPage * 6;
  const paginatedUsers = filteredUsers.slice(beginIndex, endIndex);

  return (
    <section className="md:px-10">
      <h1 className="my-3 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white text-center">
        Random Users
      </h1>

      <div className="max-w-xs">
        <form>
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
              Filtrar por:
            </h3>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="pr-3 w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <input
                    id="name"
                    onChange={() => setFilter("name")}
                    type="radio"
                    value="name"
                    name="name"
                    checked={filter === "name"}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="name"
                    className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Nome
                  </label>
                </div>
              </li>
              <li className="pr-3 w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <input
                    id="email"
                    onChange={() => setFilter("email")}
                    type="radio"
                    checked={filter === "email"}
                    value="email"
                    name="email"
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="email"
                    className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Email
                  </label>
                </div>
              </li>
              <li className="pr-3 w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <input
                    id="username"
                    onChange={() => setFilter("username")}
                    type="radio"
                    value="username"
                    checked={filter === "username"}
                    name="username"
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="username"
                    className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Usuário
                  </label>
                </div>
              </li>
            </ul>
          </div>

          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="default-search"
              className="block mt-1 w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="Digite aqui para pesquisar..."
              required
            />
          </div>
        </form>
      </div>

      <div className="justify-between my-8 flex flex-wrap gap-6">
        {paginatedUsers?.map((user, id) => (
          <UserCard key={id} user={user} />
        ))}
      </div>

      <Pagination
        totalCountOfRegisters={filteredUsers?.length!}
        onPageChange={onPageChange}
        registersPerPages={6}
        currentPage={currentPage}
      />
    </section>
  );
}
