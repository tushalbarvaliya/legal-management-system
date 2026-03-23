export type invoiceDataType = {
  totalAmount: number
  id: number
  totalHours: number
  caseId: number
  lawyerId: number
  stripeSessionId: null | number
  paymentStatus: string
  paidAt: null | string
  updatedAt: string
  status: string
  clientId: number
  companyId: number
  stripePaymentIntentId: null | number
  paymentMethod: null | string
  createdAt: string
}
export const invoiceData: invoiceDataType[] = [
  {
    totalAmount: 500000,
    id: 2,
    totalHours: 40.25,
    caseId: 2,
    lawyerId: 2,
    stripeSessionId: null,
    paymentStatus: "pending",
    paidAt: null,
    updatedAt: "2026-03-19T10:58:46",
    status: "pending",
    clientId: 2,
    companyId: 1,
    stripePaymentIntentId: null,
    paymentMethod: null,
    createdAt: "2026-03-19T10:58:46",
  },
  {
    totalAmount: 78956.3,
    id: 3,
    totalHours: 78.36,
    caseId: 4,
    lawyerId: 2,
    stripeSessionId: null,
    paymentStatus: "pending",
    paidAt: null,
    updatedAt: "2026-03-19T13:33:47",
    status: "pending",
    clientId: 2,
    companyId: 1,
    stripePaymentIntentId: null,
    paymentMethod: null,
    createdAt: "2026-03-19T13:33:47",
  },
]
