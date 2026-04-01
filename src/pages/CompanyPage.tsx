import { Mail, Phone, Calendar, MapPin, Hospital } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import Error from "@/components/ErrorPage"
import CompanyPageSkeleton from "@/components/company/CompanyPageSkeleton"
import { formatDate } from "@/utils/formate"
import { Dialog } from "@/components/ui/dialog"
import UpdateCompany from "@/components/company/UpdateCompany"
import { useGetCompanyDataQuery } from "@/store/services/companyAPI"

const CompanyPage = () => {
  const [updateCompanyModel, setUpdateCompanyModel] = useState(false)
  const { data, isLoading, isError } = useGetCompanyDataQuery()

  const companyData = data?.data.company?.[0]

  if (isLoading) {
    return <CompanyPageSkeleton />
  }
  if (isError) {
    return <Error />
  }

  return (
    <>
      {updateCompanyModel && companyData && (
        <Dialog
          open={updateCompanyModel}
          onOpenChange={(open) => {
            if (!open) setUpdateCompanyModel(false)
          }}
        >
          <UpdateCompany
            closeModal={setUpdateCompanyModel}
            data={companyData}
          />
        </Dialog>
      )}
      <section className="p-4 md:p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Header Card */}
          <div className="flex items-center gap-4 rounded-2xl border border-black bg-white p-6 shadow-sm">
            {/* left side  header */}
            <div className="flex flex-1 items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <Hospital />
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
                  setUpdateCompanyModel(true)
                }}
              >
                Update Details
              </Button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Address */}
            <div className="flex items-center gap-3 rounded-xl border border-black bg-white p-4">
              <MapPin />
              <div>
                <p className="text-xs text-gray-500">Address</p>
                <p className="text-sm font-medium text-gray-800">
                  {companyData?.Address || "-"}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 rounded-xl border border-black bg-white p-4">
              <Mail className="text-black" size={18} />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium text-gray-800">
                  {companyData?.email || "-"}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 rounded-xl border border-black bg-white p-4">
              <Phone className="text-black" size={18} />
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-sm font-medium text-gray-800">
                  {companyData?.phoneNumber || "-"}
                </p>
              </div>
            </div>

            {/* Created At */}
            <div className="flex items-center gap-3 rounded-xl border border-black bg-white p-4">
              <Calendar className="text-black" size={18} />
              <div>
                <p className="text-xs text-gray-500">Founded On</p>
                <p className="text-sm font-medium text-gray-800">
                  {companyData?.createdAt
                    ? formatDate(companyData.createdAt)
                    : "---"}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="flex justify-between rounded-xl border border-black bg-white p-4 text-sm text-black">
            <span>
              Last Updated:{" "}
              {companyData?.updatedAt
                ? formatDate(companyData.updatedAt)
                : "---"}
            </span>
          </div>
        </div>
      </section>
    </>
  )
}

export default CompanyPage
