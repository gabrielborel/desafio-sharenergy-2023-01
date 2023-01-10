import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { SearchIcon } from "../../components/icons/Search";
import { Pagination } from "../../components/Pagination";
import { UserCard } from "../../components/UserCard";
import { useToken } from "../../contexts/TokenContext";
import styles from "./styles.module.css";

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
    const token = JSON.parse(
      (localStorage.getItem("@sharenergy-access_token") as string) ||
        (sessionStorage.getItem("@sharenergy-access_token") as string)
    );

    api
      .get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data.results || []);
      })
      .catch(console.log);
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
    <section className={styles.container}>
      <h1 className={styles.title}>Usuários</h1>

      <form className={styles.form}>
        <div>
          <h3 className={styles.formDescription}>Filtrar por:</h3>
          <ul className={styles.filterList}>
            <li className={styles.filterItem}>
              <div className={styles.filterItemContainer}>
                <input
                  id="name"
                  onChange={() => setFilter("name")}
                  type="radio"
                  value="name"
                  name="name"
                  checked={filter === "name"}
                  className={styles.filterInput}
                />
                <label htmlFor="name" className={styles.filterItemLabel}>
                  Nome
                </label>
              </div>
            </li>
            <li className={styles.filterItem}>
              <div className={styles.filterItemContainer}>
                <input
                  id="email"
                  onChange={() => setFilter("email")}
                  type="radio"
                  checked={filter === "email"}
                  value="email"
                  name="email"
                  className={styles.filterInput}
                />
                <label htmlFor="email" className={styles.filterItemLabel}>
                  Email
                </label>
              </div>
            </li>
            <li className={styles.filterItem}>
              <div className={styles.filterItemContainer}>
                <input
                  id="username"
                  onChange={() => setFilter("username")}
                  type="radio"
                  value="username"
                  checked={filter === "username"}
                  name="username"
                  className={styles.filterInput}
                />
                <label htmlFor="username" className={styles.filterItemLabel}>
                  Usuário
                </label>
              </div>
            </li>
          </ul>
        </div>

        <div className={styles.searchContainer}>
          <SearchIcon />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="default-search"
            className={styles.searchInput}
            placeholder="Digite aqui para pesquisar..."
            required
          />
        </div>
      </form>

      <div className={styles.usersContainer}>
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
