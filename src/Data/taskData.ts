export type taskDatatype = {
  title: string;
  description: string;
  assignedTo: number;
  status: string;
  updatedAt: string;
  caseId: number;
  id: number;
  priority: string;
  createdAt: string;
};

export const taskData: taskDatatype[] = [
  {
    title: "test-trail",
    description: "just to check",
    assignedTo: 25,
    status: "today",
    updatedAt: "2026-03-19T12:04:03",
    caseId: 4,
    id: 2,
    priority: "low",
    createdAt: "2026-03-19T10:00:34",
  },
];
