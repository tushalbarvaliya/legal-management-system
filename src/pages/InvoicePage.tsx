import AddInvoiceModel from "@/components/Invoice/AddInvoiceModel";
import InvoiceList from "@/components/Invoice/InvoiceList";
import { useState } from "react";

const InvoicePage = () => {
  const [addModel, setAddModel] = useState(false);
  return (
    <>
      {addModel && <AddInvoiceModel closeModal={setAddModel} />}
      <button
        className="fixed bottom-6 right-6 z-20 inline-flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-xl transition duration-300 hover:scale-105 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 lg:bottom-8 lg:right-8"
        onClick={() => {
          setAddModel(true);
        }}
      >
        <img src="/plus.svg" alt="+" className="h-6 w-6" />
      </button>
      <div className="space-y-4">
        <InvoiceList />
      </div>
    </>
  );
};

export default InvoicePage;
