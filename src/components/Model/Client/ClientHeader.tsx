import { useState } from "react";
import AddClientModel from "./AddClientModel";

const ClientHeader = () => {
  const [addModal, setAddModal] = useState(false);

  return (
    <>
      {addModal && <AddClientModel closeModal={setAddModal} />}
      <section className="rounded-2xl border border-zinc-200 bg-linear-to-br from-white to-zinc-50 p-5 shadow-soft sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Client Management
            </h1>
            <p className="mt-2 text-sm text-zinc-600 sm:text-base">
              Add, edit, and manage your clients with quick actions from a
              single list.
            </p>
            <p className="mt-3 inline-flex items-center rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-xs font-medium text-zinc-600">
              Smart search, quick actions, and detailed client profiles
            </p>
          </div>

          <button
            className="fixed bottom-6 right-6 z-20 inline-flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl transition duration-300 hover:scale-105 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 lg:bottom-8 lg:right-8"
            onClick={() => setAddModal(true)}
          >
            <img src="/plus.svg" alt="+" className="h-6 w-6" />
          </button>
        </div>
      </section>
    </>
  );
};

export default ClientHeader;
