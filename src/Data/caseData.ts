export type caseDataType = {
  type: string;
  id: number;
  caseStage: string;
  status: string;
  clientId: number;
  lawyerId: number;
  createdAt: string;
  title: string;
  description: string;
  caseNumber: number;
  caseCity: string;
  caseClosedDate: string;
  isDeleted: string;
  updatedAt: string;
};

export const caseData: caseDataType[] = [
  {
    type: "criminal",
    id: 6,
    caseStage: "string",
    status: "closed",
    clientId: 2,
    lawyerId: 2,
    createdAt: "2026-03-19T10:56:20",
    title: "Murder",
    description: "alligation of murder",
    caseNumber: 89,
    caseCity: "Mumbai",
    caseClosedDate: "2026-03-19T10:55:31",
    isDeleted: "\u0000",
    updatedAt: "2026-03-19T13:43:24",
  },
  {
    type: "crime",
    id: 7,
    caseStage: "string",
    status: "open",
    clientId: 2,
    lawyerId: 2,
    createdAt: "2026-03-19T13:05:49",
    title: "Murdr",
    description: "allegation of murder",
    caseNumber: 57,
    caseCity: "string",
    caseClosedDate: "2026-03-18T06:38:29",
    isDeleted: "\u0000",
    updatedAt: "2026-03-19T13:05:49",
  },
];
