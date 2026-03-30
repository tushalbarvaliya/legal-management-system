import type { Case } from "./caseType"

export type Document = {
  fileType: string
  id: number
  notes: string | null
  userId: number
  clientId: number
  createdAt: string
  title: string
  documentLink: string
  description: string
  caseId: number
  isDeleted: string
  updatedAt: string
}

export interface CaseDocumentItem {
  document: Document
  case: Case
}
export type DocumentDataResponse = {
  data: CaseDocumentItem[]
  message: string
}
