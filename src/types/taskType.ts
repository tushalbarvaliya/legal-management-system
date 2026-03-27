export type Task = {
  caseId: number
  id: number
  priority: "low" | "medium" | "high"
  dueDate: string | null
  createdAt: string
  updatedAt: string
  description: string
  assignedTo: number
  title: string
  status: "pending" | "overdue" | "completed"
  isDeleted: "\u0000" | "\u0001"
}

export type TaskSummary = {
  pending: number
  overdue: number
  completed: number
}

export type TaskResponse = {
  tasks: Task[]
  summary: TaskSummary
}
