export type invoiceDataType = {
  id: number
  totalAmount: number
  totalHours: number
  caseId: number
  lawyerId: number
  stripeSessionId: string | null
  paymentStatus: string
  paidAt: string | null
  updatedAt: string
  status: string
  clientId: number
  companyId: number
  stripePaymentIntentId: string | null
  paymentMethod: string | null
  createdAt: string
  isDeleted: number
}