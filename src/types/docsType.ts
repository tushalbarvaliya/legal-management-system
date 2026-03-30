export type DocumentResponse = {
  document: DocumentType
  case: CaseType
}

export type DocumentType = {
  documentLink: string
  description: string
  title: string
  caseId: number
  clientId: number
  createdAt: string
  updatedAt: string
  fileType: string
  id: number
  notes: string
  userId: number
  isDeleted: number
}

export type CaseType = {
  id: number
  type: string
  caseStage: string
  status: "open" | "closed"
  clientId: number
  isDeleted: number
  updatedAt: string
  description: string
  caseNumber: number
  title: string
  caseCity: string
  caseClosedDate: string
  lawyerId: number
  createdAt: string
}
