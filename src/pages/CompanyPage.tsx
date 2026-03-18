import { company } from "@/api/adminAPi";
import { useQuery } from "@tanstack/react-query";

type companyData = {
  Address: string;
  createdAt: string;
  email: string;
  id: 1;
  name: string;
  phoneNumber: string;
  updatedAt: string;
};

const CompanyPage = () => {
  const { data } = useQuery<companyData[]>({
    queryKey: ["company", 1],
    queryFn: company,
  });
  const companyData = data?.find((item) => item.id == 1);
  return (
    <>
      <section className="bg-white">
        <div>
          <h1>Company Name : {companyData?.name}</h1>
          <h2>Address : {companyData?.Address}</h2>
          <p>Phone Number : {companyData?.Address}</p>
          <p>Company Id : {companyData?.id}</p>
          <p>Email : {companyData?.email}</p>
          <p>company Founded at : {companyData?.createdAt}</p>
        </div>
      </section>
    </>
  );
};

export default CompanyPage;
