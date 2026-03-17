const DocsHeader = () => {
  return (
    <>
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
            className="fixed bottom-6 right-6 z-20 inline-flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl transition duration-300 hover:scale-105 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 lg:bottom-8 lg:right-8"
            type="button"
          >
            <img src="/plus.svg" alt="plus" className="h-4 w-4" />
          </button>
        </div>
      </section>
    </>
  );
};

export default DocsHeader;
