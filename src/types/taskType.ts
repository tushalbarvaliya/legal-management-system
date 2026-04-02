export type TaskSummary = {
  pending: number
  overdue: number
  completed: number
}

export type TaskStatus = "pending" | "in_progress" | "completed"
export type TaskPriority = "low" | "medium" | "high"

export interface TaskResponse {
  id: number
  title: string
  description: string
  assignedTo: number
  caseId: number

  status: TaskStatus
  priority: TaskPriority

  isDeleted: boolean

  dueDate: string
  createdAt: string
  updatedAt: string
}

export type TaskType = {
  data: { tasks: TaskResponse[]; summary: TaskSummary }
  message: string
}
