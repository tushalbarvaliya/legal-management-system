export type Invoice = {
  _id: string;
  client: string;
  caseId: string;
  amount: number;
  paid: number;
  status: "Paid" | "Pending" | "Overdue";
  invoiceDate: string;
  dueDate: string;
};
