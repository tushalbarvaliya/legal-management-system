import axiosInstance from "./axiosInstance";

export const getProfile = async () => {
  try {
    const response = await axiosInstance.get("/profile");
    return response.data;
  } catch {
    return {
      firstName: "tushal",
      username:"tushal007",
      lastName: "barvaliya",
      email: "tushal@test.com",
      address: "37 laxminarayan $ dsffjn $dvad $ dfad",
      pinCode: "616516",
      phoneNumber: "9484673729",
    };
  }
};
