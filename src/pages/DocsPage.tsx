import DocsHeader from "@/components/Model/DocsModels/DocsHeader";
import { documents } from "@/utils/constant";

const DocsPage = () => {
  const set = new Set(documents.map((items) => items.caseId));
  return (
    <>
    <DocsHeader/>
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-soft sm:p-6 mt-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
              Select Client
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              Choose a client card to load related documents.
            </p>
          </div>
          <p
            id="clientCardCount"
            className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500"
          ></p>
        </div>
        <div className="mb-3">
          <label htmlFor="clientSearchInput" className="sr-only">
            Search clients
          </label>
          <div className="relative">
            <img
              src="/search.svg"
              alt="search"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="search"
              placeholder="Search client by name or client ID"
              className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-9 pr-3 text-sm text-zinc-900 outline-none transition duration-200 placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-4">
          

          {[...set].map((items) => (
            <button
              type="button"
              className={`w-full rounded-xl border p-4 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-100/80 `}
            >
              <p className="text-base font-semibold text-zinc-900">{items}</p>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default DocsPage;
