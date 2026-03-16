import InvoiceList from "@/components/Invoice/InvoiceList";

const InvoicePage = () => {
  return (
    <>
      <div className="space-y-4">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <article className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-zinc-300">
            <div className="flex items-start justify-between">
              <h2 className="text-sm font-semibold text-zinc-600">
                Total Collection
              </h2>
              <div className="rounded-lg bg-zinc-100 p-2 text-zinc-700 transition duration-200 group-hover:bg-zinc-200">
                <img
                  src="/down-icon.svg"
                  alt="down Arrow"
                  className="h-5 w-5"
                />
              </div>
            </div>
            <p
              id="totalCollectionValue"
              className="mt-5 text-3xl font-extrabold text-zinc-900"
            >
              $0
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Sum of all collected payments
            </p>
          </article>

          <article className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-zinc-300">
            <div className="flex items-start justify-between">
              <h2 className="text-sm font-semibold text-zinc-600">
                Overdue Collection
              </h2>
              <div className="rounded-lg bg-rose-50 p-2 text-rose-600 transition duration-200 group-hover:bg-rose-100">
                <img src="/rose-clock.svg" alt="0" className="h-5 w-5 " />
              </div>
            </div>
            <p
              id="overdueCollectionValue"
              className="mt-5 text-3xl font-extrabold text-zinc-900"
            >
              $0
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Outstanding past-due balances
            </p>
          </article>

          <article className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-zinc-300">
            <div className="flex items-start justify-between">
              <h2 className="text-sm font-semibold text-zinc-600">
                Incomplete / Pending Collection
              </h2>
              <div className="rounded-lg bg-amber-50 p-2 text-amber-600 transition duration-200 group-hover:bg-amber-100">
                <img src="/amber-clock.svg" alt="0" className="h-5 w-5 " />
              </div>
            </div>
            <p
              id="pendingCollectionValue"
              className="mt-5 text-3xl font-extrabold text-zinc-900"
            >
              $0
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Balances awaiting completion
            </p>
          </article>
        </section>
        <InvoiceList/>
      </div>
    </>
  );
};

export default InvoicePage;
