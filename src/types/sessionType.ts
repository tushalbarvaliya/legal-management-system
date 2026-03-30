import type { Case } from "./caseType"

export type Session = {
  id: number
  caseId: number
  clientId: number
  lawyerId: number
  courtName: string
  sessionDate: string
  sessionTime: string
  createdAt: string
  updatedAt: string
}

export type SessionWithCaseResponse = {
  session: Session
  case: Case
}

export type SessionResponse = {
  data: SessionWithCaseResponse[]
  message: string
}
