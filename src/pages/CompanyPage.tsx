import { company } from "@/api/adminAPi";
import CompanyPageSkeleton from "@/components/Company/CompanyPageSkeleton";
import CompanyUpdateModel from "@/components/Company/CompanyUpdateModel";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Mail, Phone, Calendar } from "lucide-react";
import { useState } from "react";

export type CompanyData = {
  Address: string;
  createdAt: string;
  email: string;
  id: number;
  name: string;
  phoneNumber: string;
  updatedAt: string;
};

const CompanyPage = () => {
  const [updateComponeyModel, setUpdateCompanyModel] = useState(false);
  const { data, isLoading } = useQuery<CompanyData[]>({
    queryKey: ["company"],
    queryFn: company,
  });

  const companyData = data?.find((item) => item.id === 1);

  const formatDate = (date?: string) =>
    date
      ? new Date(date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "-";

  if (isLoading) {
    return <CompanyPageSkeleton />;
  }

  return (
    <>
      {updateComponeyModel && (
        <CompanyUpdateModel
          closeModal={setUpdateCompanyModel}
          {...companyData}
        />
      )}
      <section className="p-4 md:p-6 ">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 flex items-center gap-4">
            {/* left side  header */}
            <div className="flex-1 flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                <img src="/componey.svg" alt="company" className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {companyData?.name || "Company Name"}
                </h1>
                <p className="text-sm text-gray-500">
                  Company ID: {companyData?.id}
                </p>
              </div>
            </div>
            {/* right side header */}
            <div>
              <Button
                variant={"default"}
                onClick={() => {
                  setUpdateCompanyModel(true);
                }}
              >
                Update Details
              </Button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Address */}
            <div className="bg-white rounded-xl border p-4 flex gap-3   items-center">
              <img src="/location.svg" alt="location" />
              <div>
                <p className="text-xs text-gray-500">Address</p>
                <p className="text-sm font-medium text-gray-800">
                  {companyData?.Address || "-"}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-xl border p-4 flex gap-3 items-center">
              <Mail className="text-black " size={18} />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium text-gray-800">
                  {companyData?.email || "-"}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-xl border p-4 flex gap-3 items-center">
              <Phone className="text-black " size={18} />
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-sm font-medium text-gray-800">
                  {companyData?.phoneNumber || "-"}
                </p>
              </div>
            </div>

            {/* Created At */}
            <div className="bg-white rounded-xl border p-4 flex gap-3 items-center">
              <Calendar className="text-black " size={18} />
              <div>
                <p className="text-xs text-gray-500">Founded On</p>
                <p className="text-sm font-medium text-gray-800">
                  {formatDate(companyData?.createdAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="bg-white rounded-xl border p-4 text-sm text-black flex justify-between">
            <span>Last Updated: {formatDate(companyData?.updatedAt)}</span>
            <span className="text-indigo-600 font-medium">Active</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default CompanyPage;
