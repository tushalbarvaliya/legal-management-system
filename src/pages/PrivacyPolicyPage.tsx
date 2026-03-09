import { Link } from "react-router";

const PrivacyPolicyPage = () => {
  return (
    <>
      <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-soft sm:p-6 m-4">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-zinc-600 sm:text-base">
          Last updated: March 8, 2026
        </p>
      </section>
      <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-soft flex flex-col gap-4 sm:p-6 m-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            1. Information We Collect
          </h2>
          <p className="mt-2">
            We collect account information such as your name, email address,
            role, and activity logs to provide workspace functionality and
            support services.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            2. How We Use Information
          </h2>
          <p className="mt-2">
            Data is used to operate the platform, improve performance,
            personalize your experience, maintain security, and communicate
            important account or service updates.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            3. Cookies and Similar Technologies
          </h2>
          <p className="mt-2">
            We use cookies and similar tools to keep sessions active, remember
            preferences, and analyze usage patterns. You can manage cookie
            settings in your browser.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            4. Data Sharing
          </h2>
          <p className="mt-2">
            We do not sell personal data. We may share limited data with trusted
            service providers who help us host, secure, and support AcmeDesk,
            subject to contractual safeguards.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            5. Data Retention
          </h2>
          <p className="mt-2">
            We retain personal data only for as long as needed to deliver
            services, meet legal obligations, resolve disputes, and enforce
            agreements.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            6. Security Measures
          </h2>
          <p className="mt-2">
            We use technical and organizational controls to protect data from
            unauthorized access, misuse, and loss. No method of transmission or
            storage is completely risk free.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            7. Your Rights
          </h2>
          <p className="mt-2">
            Depending on your region, you may have rights to access, correct,
            delete, or restrict processing of personal data. Requests can be
            submitted through our support channels.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            8. Policy Updates
          </h2>
          <p className="mt-2">
            We may update this policy to reflect legal, technical, or product
            changes. Updates become effective when published on this page.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900">9. Contact Us</h2>
          <p className="mt-2">
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
    </>
  );
};

export default PrivacyPolicyPage;
