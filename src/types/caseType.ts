type Timestamp = string;

export type Case = {
  id: number;
  type: string;
  caseStage: string;
  status: "open" | "closed" ;

  clientId: number;
  lawyerId: number;

  caseNumber: number;
  title: string;
  description: string;
  caseCity: string;

  caseClosedDate: Timestamp;

  isDeleted: 0 | 1;

  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type Client = {
  id: number;
  userId: number;
  lawyerId: number;

  crNumber: number;
  vatNumber: number;
  vatPercentage: number;
  occupation: string;

  isBlocked: 0 | 1;
  isDeleted: 0 | 1;

  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type User = {
  id: number;

  firstName: string;
  lastName: string;
  name: string;

  email: string;
  password: string;

  phoneNumber: string;
  address: string;

  gender: "male" | "female" | "other";
  role: "client" | "admin" | "lawyer" | "staff";

  companyId: number | null;

  isDeleted: 0 | 1;
  isBlocked: 0 | 1;

  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type CaseWithClientUser = {
  case: Case;
  client: Client;
  user: User;
};