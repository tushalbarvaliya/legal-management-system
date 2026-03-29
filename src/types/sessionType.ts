export type Session = {
  id: number
  caseId: number
  clientId: number
  lawyerId: number
  courtName: string
  sessionDate: string // yyyy-MM-dd
  sessionTime: string // HH:mm:ss
  createdAt: string // ISO
  updatedAt: string // ISO
}

export type Case = {
  id: number
  type: string
  caseStage: string
  status: "open" | "closed" // better strict typing
  clientId: number
  lawyerId: number
  isDeleted: number
  caseNumber: number
  title: string
  description: string
  caseCity: string
  caseClosedDate: string // ISO date
  createdAt: string
  updatedAt: string
}

export type SessionWithCaseResponse = {
  session: Session
  case: Case
}
