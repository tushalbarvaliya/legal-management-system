import axiosInstance from "./axiosInstance"

export const pay = async(id: number) => {
  const response = await axiosInstance.post(`/invoices/${id}/pay`)
  return response.data
}
