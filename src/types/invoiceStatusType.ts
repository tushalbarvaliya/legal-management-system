export type Invoice = {
  id: number
  status: "pending" | "paid" | "failed"
  totalAmount: number
  clientId: number
  companyId: number
  stripePaymentIntentId: string | null
  paymentStatus: "pending" | "paid" | "failed"
  paidAt: string | null
  updatedAt: string
  totalHours: number
  caseId: number
  lawyerId: number
  stripeSessionId: string | null
  paymentMethod: string | null
  createdAt: string
}

export type InvoiceResponse = {
  data: {
    invoices: Invoice[]
    total_paid: number
    total_pending: number
  }
  message: string
}

export type CasesStatusChangeResponse = {
  casesStatusChangeInLast30Days: number
}
