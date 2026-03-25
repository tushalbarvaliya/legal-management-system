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
