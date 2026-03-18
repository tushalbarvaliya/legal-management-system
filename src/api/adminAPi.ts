import type { AddLawyerFormData } from "@/components/Lawyer/AddLawyerModel";
import axiosInstance from "./axiosInstance";

export const getAllUser = async () => {
  try {
    const response = await axiosInstance.get("/users/");
    return response.data;
  } catch  {
    return [
      {
        lastName: "string",
        email: "string",
        password:
          "$2b$12$I4ZwrG6K74ztfhW8U4//qerFHOoFuOWciPX2ozsFdpHuhard9iPiO",
        role: "admin",
        isDeleted: true,
        createdAt: "2026-03-11T05:32:37",
        name: "string",
        firstName: "string",
        id: 1,
        phoneNumber: "string",
        address: "string",
        companyId: 1,
        isBlocked: "\u0000",
        updatedAt: "2026-03-11T05:32:37",
      },
      {
        lastName: "barvaliya",
        email: "tushal@gmail.com",
        password:
          "$2b$12$kWb4yVXTilSGAC5nNn1XOu3S3IJ6laypjCbR0NyG/nMtAgIAaBUXK",
        role: "admin",
        isDeleted: true,
        createdAt: "2026-03-11T05:36:28",
        name: "tushal007",
        firstName: "tushal",
        id: 2,
        phoneNumber: "9484673729",
        address: "37, laxminarayan soc Ahemedabad Gujarat 122345",
        companyId: 1,
        isBlocked: "\u0000",
        updatedAt: "2026-03-12T13:04:11",
      },
      {
        lastName: "string",
        email: "string@",
        password:
          "$2b$12$Uu0towawFWcFt0P7IHBSLeT7Z2PwzB88XRiKo/yBOyg1qwl42dPpu",
        role: "lawyer",
        isDeleted: true,
        createdAt: "2026-03-11T07:10:42",
        name: "Disha",
        firstName: "string",
        id: 6,
        phoneNumber: "string@",
        address: "string",
        companyId: 1,
        isBlocked: "\u0000",
        updatedAt: "2026-03-12T05:47:48",
      },
      {
        lastName: "patel",
        email: "khushi@gmail.com",
        password:
          "$2b$12$W7EkvBDBEykw17mlGf1/z.xvWYj5DFbyOhq997ySzGm2.Hj7hegim",
        role: "admin",
        isDeleted: true,
        createdAt: "2026-03-11T10:54:47",
        name: "khushi99",
        firstName: "khushi",
        id: 7,
        phoneNumber: "9484673726",
        address: "37 laxminarayan soc$suart$gujrat$251436",
        companyId: 1,
        isBlocked: "\u0000",
        updatedAt: "2026-03-11T10:54:47",
      },
      {
        lastName: "patel",
        email: "ketul@gmail.com",
        password:
          "$2b$12$QYKZdAsPzjevL0yEbdVfC.d9Wug3ze3p1jIMZZgbqr6l4C04CcNxS",
        role: "lawyer",
        isDeleted: true,
        createdAt: "2026-03-11T11:24:43",
        name: "ketul3",
        firstName: "ketul",
        id: 8,
        phoneNumber: "1200000000",
        address: "long Street $Goa$Gujarat$120000",
        companyId: 1,
        isBlocked: "\u0000",
        updatedAt: "2026-03-11T11:24:43",
      },
      {
        lastName: "parel",
        email: "arjun@gmail.com",
        password:
          "$2b$12$YYE5.OlRi5mvJ21/HGSnKekdQrYc6so5yhenVxIm09qNJv59qYFxi",
        role: "lawyer",
        isDeleted: true,
        createdAt: "2026-03-11T11:30:15",
        name: "arjun3",
        firstName: "arjun",
        id: 9,
        phoneNumber: "8184673729",
        address: "Password123$Password123$Password$123456",
        companyId: 1,
        isBlocked: "\u0000",
        updatedAt: "2026-03-11T12:41:30",
      },
      {
        lastName: "Shah",
        email: "tusha003@gamil.com",
        password:
          "$2b$12$VFn2rvBxbLuxzUDiRkoDGuoRJcJ7VOIL2NiioWX8SYLvmqHx2hCzG",
        role: "admin",
        isDeleted: true,
        createdAt: "2026-03-12T12:13:13",
        name: "tushal003",
        firstName: "Tushaal",
        id: 16,
        phoneNumber: "9925415243",
        address: "Ahmedabad",
        companyId: 1,
        isBlocked: "\u0000",
        updatedAt: "2026-03-12T12:13:13",
      },
      {
        lastName: "string",
        email: "Rutu@",
        password:
          "$2b$12$J93u8t/POVNsT94Ha8RxyuITHCpLTtW.C9S5M/CfSX.B39oy.y2Pu",
        role: "admin",
        isDeleted: true,
        createdAt: "2026-03-12T12:21:08",
        name: "Rutu",
        firstName: "string",
        id: 20,
        phoneNumber: "8989898989",
        address: "string",
        companyId: 1,
        isBlocked: "\u0000",
        updatedAt: "2026-03-12T12:21:08",
      },
      {
        lastName: "string",
        email: "Diya@gmail.com",
        password:
          "$2b$12$0Vc5Zycc5nbPKvrTTbjOfuhv7XGPS3u/3JKaJ/dZRjVCOjMzzEaKG",
        role: "staff",
        isDeleted: true,
        createdAt: "2026-03-12T13:02:54",
        name: "Diya",
        firstName: "string",
        id: 21,
        phoneNumber: "2323232323",
        address: "string",
        companyId: 1,
        isBlocked: "\u0000",
        updatedAt: "2026-03-12T13:02:54",
      },
      {
        lastName: "string",
        email: "Nidhi@gmail.com",
        password:
          "$2b$12$.zRk3YtQnn7lW3WIM5U8UeI/APmgQ3pP28UKnvW7jcmCpMFdROFoy",
        role: "admin",
        isDeleted: true,
        createdAt: "2026-03-13T08:04:01",
        name: "Nidhi",
        firstName: "string",
        id: 23,
        phoneNumber: "6591552710",
        address: "string",
        companyId: 1,
        isBlocked: "\u0000",
        updatedAt: "2026-03-13T08:04:01",
      },
      {
        lastName: "string",
        email: "user@example.com",
        password:
          "$2b$12$H6rUD2SfaUXGpJSXgJqtReSQYyevym1Euy7tzyKJXH5/ADqRhejGu",
        role: "admin",
        isDeleted: true,
        createdAt: "2026-03-13T08:04:42",
        name: "Netra",
        firstName: "string",
        id: 24,
        phoneNumber: "1810725989",
        address: "string",
        companyId: 1,
        isBlocked: "\u0000",
        updatedAt: "2026-03-13T08:04:42",
      },
      {
        lastName: "shah",
        email: "jaxa@gmail.com",
        password:
          "$2b$12$uaG3xqUAHsISQHkYbmJub.7FvMFvQVQsdya3CHMG7OyNm7/g3P0l6",
        role: "lawyer",
        isDeleted: true,
        createdAt: "2026-03-16T05:50:19",
        name: "Jaxa",
        firstName: "jaxa",
        id: 25,
        phoneNumber: "5688147552",
        address: "string",
        companyId: 1,
        isBlocked: "\u0000",
        updatedAt: "2026-03-16T05:50:19",
      },
      {
        lastName: "shah",
        email: "ansh@gmail.com",
        password:
          "$2b$12$/QCNCA2PPh.tCnNjiUu3cuvAOwcDDkA9suZxQx39OJOCwKbmysdTm",
        role: "lawyer",
        isDeleted: true,
        createdAt: "2026-03-17T06:18:47",
        name: "Ansh",
        firstName: "ansh",
        id: 33,
        phoneNumber: "3753636572",
        address: "string",
        companyId: 1,
        isBlocked: "\u0000",
        updatedAt: "2026-03-17T06:18:47",
      },
      {
        lastName: "barvaliya",
        email: "tushal123@gmail.com",
        password:
          "$2b$12$ouxwd.wvO4nbW4zq17ZA6OT9C3hpCLEpR5LZSVe5JV.y953HcXije",
        role: "admin",
        isDeleted: true,
        createdAt: "2026-03-17T06:23:38",
        name: "tushal5",
        firstName: "tushal",
        id: 34,
        phoneNumber: "9826481651",
        address: "37,laxminarayan soc",
        companyId: 1,
        isBlocked: "\u0000",
        updatedAt: "2026-03-17T06:23:38",
      },
      {
        lastName: "trivedi",
        email: "dolly@gmail.com",
        password:
          "$2b$12$ScYiZpJkPttc9lnADx/1seIkCn.3Sys7ZnJE4ZhiNnMFA3zRXy9c6",
        role: "staff",
        isDeleted: true,
        createdAt: "2026-03-17T10:55:46",
        name: "dolly",
        firstName: "dolly",
        id: 35,
        phoneNumber: "2002521541",
        address: "string",
        companyId: 1,
        isBlocked: "\u0000",
        updatedAt: "2026-03-17T10:55:46",
      },
      {
        lastName: "barvaliyaa",
        email: "tushal5@gmail.com",
        password:
          "$2b$12$eXmRJx7TcaikkGIglTwYjus3rYMsWniR3tF9ay.SIeUcm9Dq9VYtq",
        role: "lawyer",
        isDeleted: true,
        createdAt: "2026-03-17T12:17:00",
        name: "tushal5",
        firstName: "tushall",
        id: 36,
        phoneNumber: "7891589163",
        address: "37 laxminarayan sco$ahemadabad$gujarat$259893",
        companyId: 1,
        isBlocked: "\u0000",
        updatedAt: "2026-03-17T12:17:00",
      },
      {
        lastName: "tushal",
        email: "tushal1234@gmail.com",
        password:
          "$2b$12$XdwuY8CnKYOSwkyYPyw4KuvhELcpPFd4JUlJcODispT8OU5Jte7Da",
        role: "lawyer",
        isDeleted: true,
        createdAt: "2026-03-18T06:50:40",
        name: "tushalL2",
        firstName: "Ltushal",
        id: 37,
        phoneNumber: "6468449849",
        address: "wdfv efb$ouyuyv$dwffcvyukb$789458",
        companyId: 1,
        isBlocked: "\u0000",
        updatedAt: "2026-03-18T06:50:40",
      },
    ];
  }
};

export const getCaseCount = async () => {
  const response = await axiosInstance.get("/admins/dashboard/case_counts");
  return response.data;
};

export const getTaskCount = async () => {
  const response = await axiosInstance.get("/admins/dashboard/task_counts");
  return response.data;
};
export const getCompony = async () => {
  const response = await axiosInstance.get("/admins/dashboard/employees/1");
  return response.data;
};

export const makeItLawyer = async (data: AddLawyerFormData) => {
  const response = await axiosInstance.post("/lawyers/lawyer", {
    ...data,
    isBlocked: 0,
  });
  return response.data;
};

export const company=async()=>{
  const response=await axiosInstance.get('/companies/')
  return response.data
}
