import { Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { CreateClient } from "../components/CreateClient";
import { Pagination } from "../components/Pagination";
import { Toast } from "../components/Toast";
import { UpdateClient } from "../components/UpdateClient";
import { useToken } from "../contexts/TokenContext";
import { LOADING_SPEED, wait } from "../helpers/Wait";

export interface Client {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  cellphone: string;
  address: string;
}

export function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const { token: accessToken } = useToken();
  const [currentPage, setCurrentPage] = useState(1);
  const [openToast, setOpenToast] = useState({
    open: false,
    status: "",
    content: "",
  });

  useEffect(() => {
    api
      .get("/clients", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => setClients(res.data))
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
    setClients((prev) => [...prev, client]);
  }

  function updateClient(client: Client) {
    setClients((prev) => prev.map((c) => (c.id === client.id ? client : c)));
  }

  function removeClient(id: string) {
    api.delete(`/clients/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setClients((prev) => prev.filter((c) => c.id !== id));

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
  const paginatedClients = clients.slice(beginIndex, endIndex);

  return (
    <section className="min-h-[540px] flex flex-col">
      <Toast
        open={openToast.open}
        onClose={handleCloseToast}
        content={openToast.content}
        status={openToast.status}
      />

      <h1 className="my-3 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white text-center">
        Clientes
      </h1>

      <CreateClient
        handleOpenToast={handleOpenToast}
        handleCloseToast={handleCloseToast}
        handleAddClient={addClient}
      />

      <div className="mt-6 flex flex-1 flex-wrap gap-4 justify-evenly">
        {paginatedClients.length ? (
          paginatedClients.map((client) => {
            const cpf = `${client.cpf.slice(0, 3)}.${client.cpf.slice(
              3,
              6
            )}.${client.cpf.slice(6, 9)}-${client.cpf.slice(9, 11)}`;

            const cellphone =
              client.cellphone.length === 11
                ? `(${client.cellphone.slice(0, 2)}) ${client.cellphone.slice(
                    2,
                    7
                  )}-${client.cellphone.slice(7, 11)}`
                : `${client.cellphone.slice(0, 5)}-${client.cellphone.slice(
                    5,
                    9
                  )}`;

            return (
              <div className="max-w-xs max-h-[190px] w-full p-6 pb-4 bg-white border border-gray-200 rounded-md hover:-translate-y-1 transition-transform shadow-md dark:bg-gray-800 dark:border-gray-700">
                <h5 className="text-2xl mb-1 font-semibold tracking-tight text-gray-900 dark:text-white">
                  {client.name}
                </h5>
                <p className="font-normal text-gray-600 dark:text-gray-400">
                  {client.email}
                </p>

                <p className="font-normal text-gray-600 dark:text-gray-400">
                  {cellphone} • {cpf}
                </p>

                <p className="font-normal mb-1 text-gray-600 dark:text-gray-400">
                  {client.address}
                </p>

                <div className="mt-3 flex justify-between">
                  <UpdateClient
                    clientId={client.id!}
                    handleOpenToast={handleOpenToast}
                    handleCloseToast={handleCloseToast}
                    handleSubstituteClient={updateClient}
                  />

                  <button
                    onClick={() => removeClient(client.id!)}
                    className="inline-flex gap-1 items-center text-red-600 p-1 py-0 rounded-sm hover:bg-red-100 transition-colors"
                  >
                    <Trash size={18} /> Remover
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-900">
            Não existe nenhum cliente cadastrado =/
          </p>
        )}
      </div>

      <Pagination
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalCountOfRegisters={clients.length}
      />
    </section>
  );
}
