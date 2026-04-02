import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Helmet } from "react-helmet-async"

import type { PolicyType } from "@/types/types"
import { termsAndConditionsList } from "@/utils/policyConstant"

const TermsAndConditionsPage = () => {
  return (
    <motion.div
      className="h-full space-y-2 overflow-y-scroll no-scrollbar"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Helmet>
        <title>Terms and Conditions</title>
      </Helmet>
      <section className="shadow-soft rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          Terms and Conditions
        </h1>
        <p className="mt-2 text-sm text-zinc-600 sm:text-base">
          Last updated: March 8, 2026
        </p>
      </section>
      <section className="shadow-soft flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
        {termsAndConditionsList.map((item: PolicyType) => (
          <div key={item.title}>
            <h2 className="text-lg font-semibold text-zinc-900">
              {item.title}
            </h2>
            <p className="mb-2 dark:text-black">{item.paragraph}</p>
          </div>
        ))}

        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            9. Contact Information
          </h2>
          <p className="mb-2 dark:text-black">
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
    </motion.div>
  )
}

export default TermsAndConditionsPage
