type Timestamp = string
export type Case = {
  id: number
  type: string
  caseStage: string
  status: "open" | "closed"

  clientId: number
  lawyerId: number

  caseNumber: number
  title: string
  description: string
  caseCity: string

  caseClosedDate: Timestamp

  isDeleted: "\u0000" | "\u0001"

  createdAt: Timestamp
  updatedAt: Timestamp
}

export type CasesResponse = {
  data: { cases: Case[] }
  message: string
}
