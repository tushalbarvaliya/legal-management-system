import { Link } from "react-router-dom"

import { termsAndConditionsList, type termsAndConditionsListType } from "@/utils/policyConstant"

const TermsAndConditionsPage = () => {
  return (
    <>
      <section className="shadow-soft m-4 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          Terms and Conditions
        </h1>
        <p className="mt-2 text-sm text-zinc-600 sm:text-base">
          Last updated: March 8, 2026
        </p>
      </section>
      <section className="shadow-soft m-4 flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
        {termsAndConditionsList.map((item: termsAndConditionsListType) => (
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">
              {item.title}
            </h2>
            <p className="mt-2">{item.paragraph}</p>
          </div>
        ))}

        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            9. Contact Information
          </h2>
          <p className="mt-2">
            For questions about these terms, contact us at{" "}
            <Link
              to="mailto:privacy@acmedesk.com"
              className="font-medium text-zinc-900 underline underline-offset-2"
            >
              privacy@acmedesk.com
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}

export default TermsAndConditionsPage
