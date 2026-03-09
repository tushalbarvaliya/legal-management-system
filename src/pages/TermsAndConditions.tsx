import { Link } from "react-router";

const TermsAndConditions = () => {
  return (
    <>
      <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-soft sm:p-6 m-4">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          Terms and Conditions
        </h1>
        <p className="mt-2 text-sm text-zinc-600 sm:text-base">
          Last updated: March 8, 2026
        </p>
      </section>
      <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-soft flex flex-col gap-4 sm:p-6 m-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            1. Acceptance of Terms
          </h2>
          <p className="mt-2">
            By accessing or using AcmeDesk, you agree to these Terms and
            Conditions. If you do not agree, you must stop using the platform
            immediately.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            2. User Accounts
          </h2>
          <p className="mt-2">
            You are responsible for maintaining the confidentiality of your
            login credentials and for all activity under your account. You must
            notify us promptly if you suspect unauthorized access.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            3. Acceptable Use
          </h2>
          <p className="mt-2">
            You agree not to misuse the service, reverse engineer core systems,
            interfere with operations, or upload unlawful, harmful, or abusive
            content.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            4. Service Availability
          </h2>
          <p className="mt-2">
            We aim to provide reliable uptime, but we do not guarantee
            uninterrupted service. Planned maintenance or technical issues may
            temporarily affect access.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            5. Intellectual Property
          </h2>
          <p className="mt-2">
            All software, designs, trademarks, and documentation related to
            AcmeDesk remain the property of AcmeDesk or its licensors. You
            receive a limited, non-transferable right to use the service.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            6. Limitation of Liability
          </h2>
          <p className="mt-2">
            To the maximum extent permitted by law, AcmeDesk is not liable for
            indirect, incidental, or consequential damages resulting from use or
            inability to use the platform.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            7. Termination
          </h2>
          <p className="mt-2">
            We may suspend or terminate access if these terms are violated or if
            continued use presents a security, legal, or operational risk.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            8. Changes to Terms
          </h2>
          <p className="mt-2">
            We may update these terms from time to time. Updates become effective when posted on this page,
              and continued use indicates acceptance of revised terms.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-zinc-900">9. Contact Information</h2>
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
  );
};

export default TermsAndConditions;
