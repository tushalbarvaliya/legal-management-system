export type Case = {
  id: number
  title: string
  description: string
  caseNumber: number
  caseCity: string
  caseClosedDate: string 
  lawyerId: number
  clientId: number
  type: string
  caseStage: string
  status: "open" | "closed" 
  createdAt: string
  updatedAt: string
  isDeleted: "\u0000" | "\u0001"
}

export type CaseData = {
  cases: Case[]
}

export type CaseResponse = {
  data: CaseData
  message: string
}
