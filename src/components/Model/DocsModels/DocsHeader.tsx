import { useState } from "react";
import AddDocsModal from "./AddDocsModal";

const DocsHeader = () => {
  const [addModalShow, setAddModalShow] = useState(false);
  return (
    <>
      {addModalShow && <AddDocsModal onClose={setAddModalShow}/>}
      <section className="rounded-2xl border border-zinc-200 bg-linear-to-br from-white to-zinc-50 p-5 shadow-soft sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
              Document Management
            </h1>
            <p className="mt-2 text-sm text-zinc-600 sm:text-base">
              Select a client to review case documents. Create, edit, and remove
              records with quick actions.
            </p>
            <p className="mt-3 inline-flex items-center rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-xs font-medium text-zinc-600">
              Minimal workflow, clean records, fast edits
            </p>
          </div>
          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:scale-[1.02] hover:bg-zinc-800 sm:w-auto"
            type="button"
            onClick={()=>{setAddModalShow(true)}}
          >
            <img src="/plus.svg" alt="plus" className="h-4 w-4" />
            Add Document
          </button>
        </div>
      </section>
    </>
  );
};

export default DocsHeader;
