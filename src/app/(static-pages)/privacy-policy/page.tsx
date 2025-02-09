import About from "@/app/components/Dynamic/Sidebar/About";
import SideNewsletter from "@/app/components/Dynamic/Sidebar/Newsletter";
import RecentPosts from "@/app/components/Dynamic/Sidebar/RecentPosts";
import { Archivo } from "next/font/google";
import React from "react";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-old-standard-tt",
});

const page = () => {
  return (
    <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto md:px-6 mt-16 mb-16">
      <div className="lg:flex gap-16">
        <div className="lg:w-9/12 lg:border-r-[1px] lg:border-slate-200 lg:pr-10">
          <article>
            <h1
              className={`${archivo.className} text-2xl md:text-4xl font-bold text-gray-900 mb-10 text-center decoration-amber-700 underline`}
            >
              Privacy Policy
            </h1>
          </article>
          <section>
            <div className="text-slate-900 font-semibold">
              <p className="text-lg text-gray-700 mb-4">
                <strong>Effective Date: Nov 14, 2024</strong>
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Foud Recipes values your privacy and is committed to protecting
                your personal information. This Privacy Policy outlines how we
                collect, use, and safeguard your data when you visit or interact
                with our website.
              </p>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  1. Information We Collect
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  <strong>a. Personal Information</strong>
                </p>
                <ul className="list-disc pl-6 text-lg text-gray-700 mb-4">
                  <li>Sign up for a newsletter (e.g., name, email address).</li>
                  <li>Submit comments or contact us via forms.</li>
                </ul>

                <p className="text-lg text-gray-700 mb-4">
                  <strong>b. Non-Personal Information</strong>
                </p>
                <ul className="list-disc pl-6 text-lg text-gray-700 mb-4">
                  <li>IP address, browser type, and operating system.</li>
                  <li>Pages viewed, time spent, and referral sources.</li>
                </ul>

                <p className="text-lg text-gray-700 mb-4">
                  <strong>c. Cookies and Tracking Technologies</strong>
                </p>
                <p className="text-lg text-gray-700 mb-4">We use cookies to:</p>
                <ul className="list-disc pl-6 text-lg text-gray-700 mb-4">
                  <li>Improve user experience.</li>
                  <li>Analyze site traffic.</li>
                  <li>Offer personalized content.</li>
                </ul>
                <p className="text-lg text-gray-700 mb-4">
                  You can manage cookie preferences in your browser settings.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  2. How We Use Your Information
                </h2>
                <ul className="list-disc pl-6 text-lg text-gray-700 mb-4">
                  <li>Provide and improve our Services.</li>
                  <li>Respond to your inquiries.</li>
                  <li>Send newsletters or updates (if subscribed).</li>
                  <li>Monitor website performance and user engagement.</li>
                </ul>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  3. Sharing Your Information
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  We do not sell your personal information. However, we may
                  share data with:
                </p>
                <ul className="list-disc pl-6 text-lg text-gray-700 mb-4">
                  <li>
                    <strong>Legal Requirements:</strong> To comply with legal
                    obligations or protect our rights.
                  </li>
                </ul>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  4. Third-Party Links
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  Our website may link to third-party websites. We are not
                  responsible for their privacy practices or content. Please
                  review their privacy policies before sharing information.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  5. Data Security
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  We implement appropriate technical and organizational measures
                  to protect your data. However, no method of online
                  transmission or storage is 100% secure, and we cannot
                  guarantee absolute security.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">6. Your Rights</h2>
                <p className="text-lg text-gray-700 mb-4">
                  Depending on your location, you may have the following rights:
                </p>
                <ul className="list-disc pl-6 text-lg text-gray-700 mb-4">
                  <li>
                    Access and Update: Request access to or correction of your
                    personal data.
                  </li>
                  <li>
                    Data Deletion: Request the deletion of your personal
                    information.
                  </li>
                  <li>Opt-Out: Unsubscribe from newsletters or cookies.</li>
                </ul>
                <p className="text-lg text-gray-700 mb-4">
                  To exercise your rights, please contact us at
                  <a
                    href="mailto:contact@foudrecipes.com"
                    className="text-blue-500"
                  >
                    contact@foudrecipes.com
                  </a>
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  7. Children&#39;s Privacy
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  Our Services are not intended for individuals under 18 years
                  old. We do not knowingly collect information from children.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">
                  8. Changes to This Policy
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  We may update this Privacy Policy from time to time.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">9. Contact Us</h2>
                <p className="text-lg text-gray-700 mb-4">
                  For questions or concerns regarding this Privacy Policy,
                  please contact us at:
                </p>
                <p className="text-lg text-blue-500">
                  <a href="mailto:contact@foudrecipes.com">
                    contact@foudrecipes.com
                  </a>
                </p>
              </section>
            </div>
          </section>
        </div>
        <div className="lg:w-3/12">
          <About />
          <SideNewsletter />
          <RecentPosts />
        </div>
      </div>
    </div>
  );
};

export default page;
