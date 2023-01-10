import { StripeLogo, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { CreateClient } from "../../components/CreateClient";
import { Pagination } from "../../components/Pagination";
import { Toast } from "../../components/Toast";
import { UpdateClient } from "../../components/UpdateClient";
import { LOADING_SPEED, wait } from "../../helpers/Wait";
import styles from "./styles.module.css";

export interface Client {
  id?: string;
  ID?: string;
  name: string;
  email: string;
  cpf: string;
  cellphone: string;
  address: string;
}

export function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openToast, setOpenToast] = useState({
    open: false,
    status: "",
    content: "",
  });

  useEffect(() => {
    const token = JSON.parse(
      (localStorage.getItem("@sharenergy-access_token") as string) ||
        (sessionStorage.getItem("@sharenergy-access_token") as string)
    );

    api
      .get("/clients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setClients(res.data || []))
      .catch(console.error);
  }, []);

  function handleCloseToast() {
    setOpenToast((state) => ({ ...state, open: false }));
  }

  function handleOpenToast(content: string, status: string) {
    setOpenToast({
      open: true,
      content,
      status,
    });
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function addClient(client: Client) {
    setClients(() => [...clients, client]);
  }

  function updateClient(client: Client) {
    setClients((prev) =>
      prev.map((c) => {
        if (c.ID) {
          return c.ID === client.ID ? client : c;
        } else {
          return c.id === client.id ? client : c;
        }
      })
    );
  }

  async function removeClient(id: string) {
    const token = JSON.parse(
      (localStorage.getItem("@sharenergy-access_token") as string) ||
        (sessionStorage.getItem("@sharenergy-access_token") as string)
    );

    await api.delete(`/clients/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setClients((prev) =>
      prev.filter((c) => {
        if (c.ID) {
          return c.ID !== id;
        } else {
          return c.id !== id;
        }
      })
    );

    setOpenToast({
      open: true,
      content: "Cliente removido com sucesso!",
      status: "success",
    });

    wait(LOADING_SPEED.MEDIUM).then(() =>
      setOpenToast((state) => ({ ...state, open: false }))
    );
  }

  const beginIndex = (currentPage - 1) * 6;
  const endIndex = currentPage * 6;
  const paginatedClients = clients?.slice(beginIndex, endIndex);

  return (
    <section className={styles.container}>
      <Toast
        open={openToast.open}
        onClose={handleCloseToast}
        content={openToast.content}
        status={openToast.status}
      />

      <h1 className={styles.title}>Clientes</h1>

      <CreateClient
        handleOpenToast={handleOpenToast}
        handleCloseToast={handleCloseToast}
        handleAddClient={addClient}
      />

      <div className={styles.clientsContainer}>
        {paginatedClients?.length ? (
          paginatedClients?.map((client) => {
            const cpf = `${client.cpf?.slice(0, 3)}.${client.cpf?.slice(
              3,
              6
            )}.${client.cpf?.slice(6, 9)}-${client.cpf?.slice(9, 11)}`;

            const cellphone =
              client.cellphone.length === 11
                ? `(${client.cellphone?.slice(0, 2)}) ${client.cellphone?.slice(
                    2,
                    7
                  )}-${client.cellphone?.slice(7, 11)}`
                : `${client.cellphone?.slice(0, 5)}-${client.cellphone?.slice(
                    5,
                    9
                  )}`;

            return (
              <div className={styles.clientCard} key={client.id}>
                <h5 className={styles.clientName}>{client.name}</h5>
                <p className={styles.clientStat}>{client.email}</p>

                <p className={styles.clientStat}>
                  {cellphone} • {cpf}
                </p>

                <p className={styles.clientStat}>{client.address}</p>

                <div className={styles.clientActions}>
                  <UpdateClient
                    clientId={client.id! || client.ID!}
                    handleOpenToast={handleOpenToast}
                    handleCloseToast={handleCloseToast}
                    handleSubstituteClient={updateClient}
                  />

                  <button
                    onClick={() => removeClient(client.id! || client.ID!)}
                    className={styles.removeClientBtn}
                  >
                    <Trash size={18} /> Remover
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className={styles.clientNotFound}>
            Não existe nenhum cliente cadastrado =/
          </p>
        )}
      </div>

      <Pagination
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalCountOfRegisters={clients?.length}
      />
    </section>
  );
}
