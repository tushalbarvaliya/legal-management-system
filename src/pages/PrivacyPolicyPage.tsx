import { Link } from "react-router"
import { motion } from "framer-motion"

import { privacyPolicyPage, type privacyPolicyPageData } from "@/utils/policyConstant"

const PrivacyPolicyPage = () => {
  return (
    <motion.div className="space-y-2" initial={{y:20,opacity:0}} animate={{y:0,opacity:1}}>
      <section className="shadow-soft  rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-zinc-600 sm:text-base">
          Last updated: March 8, 2026
        </p>
      </section>

      <section className="shadow-soft  flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
        {privacyPolicyPage.map((item: privacyPolicyPageData) => (
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">
              {item.title}
            </h2>
            <p className="mb-2">{item.paragraph}</p>
          </div>
        ))}
        <div >
          <h2 className="text-lg font-semibold text-zinc-900">9. Contact Us</h2>
          <p className="mb-2">
            If you have privacy questions, contact us at{" "}
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

export default PrivacyPolicyPage
