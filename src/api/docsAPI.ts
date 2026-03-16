import type { DocsState } from "@/types/formType";
import axiosInstance from "./axiosInstance";

export const docsAdd = async ({
  caseID,
  clientID,
  description,
  fileLink,
  note,
  title,
}: DocsState) => {
  const data = {
    title,
    documentLink: fileLink,
    fileType: "pdf",
    description,
    notes: note,
    caseId: caseID,
    clientId: clientID,
  };
  const response = await axiosInstance.post("/documents/document", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
