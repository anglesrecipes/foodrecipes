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
              Terms of Use
            </h1>
          </article>
          <div className="container mx-auto px-4 py-10">
            <p className="text-lg text-gray-700 mb-4">
              <strong>Effective Date: Nov 14, 2024</strong>
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Welcome to www.foudrecipes.com These Terms of Service govern your
              access to and use of our website, including any content, features,
              and services provided. By using our site, you agree to these
              Terms. If you do not agree, please discontinue use immediately.
            </p>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                1. Acceptance of Terms
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                By accessing or using www.foudrecipes.com you agree to comply
                with these Terms, as well as our Privacy Policy.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">2. Use of Content</h2>
              <p className="text-lg text-gray-700 mb-4">
                All recipes, images, articles, and other content on this website
                are for personal, non-commercial use only.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                You may share or bookmark recipes for personal use but must not
                reproduce, distribute, or use them commercially without explicit
                written permission.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Any use of our Content must credit www.foudrecipes.com
                appropriately.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                3. User Responsibilities
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                When using the site, you agree to:
              </p>
              <ul className="list-disc pl-6 text-lg text-gray-700 mb-4">
                <li>Use the Services for lawful purposes only.</li>
                <li>
                  Refrain from submitting harmful, offensive, or infringing
                  materials, including comments or uploaded content.
                </li>
                <li>
                  Not interfere with the website&#39;s operation, such as by
                  introducing viruses, spamming, or hacking.
                </li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                4. Recipes and Nutritional Information
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Recipes and nutritional information are provided for
                informational purposes only.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                While we strive for accuracy, results may vary, and we do not
                guarantee exact outcomes or health benefits. Always consult a
                professional for dietary or health concerns.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                5. Third-Party Links
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Our site may include links to third-party websites or services.
                We are not responsible for their content, policies, or
                practices. Accessing third-party links is at your own risk.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                6. Intellectual Property
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                All intellectual property, including but not limited to recipes,
                text, graphics, logos, and design elements, is owned by
                www.foudrecipes.com or our licensors.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Unauthorized use of our intellectual property is prohibited.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">7. Privacy</h2>
              <p className="text-lg text-gray-700 mb-4">
                Your use of the Services is subject to our Privacy Policy, which
                outlines how we collect, use, and protect your information.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                8. Disclaimer of Warranties
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                The Services are provided &#34;as is&#34; and &#34;as
                available.&#34; www.foudrecipes.com makes no guarantees
                regarding the accuracy, reliability, or availability of the
                Content. We disclaim all warranties, including but not limited
                to fitness for a particular purpose.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                9. Limitation of Liability
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                www.foudrecipes.com is not liable for:
              </p>
              <ul className="list-disc pl-6 text-lg text-gray-700 mb-4">
                <li>Errors, inaccuracies, or omissions in the Content.</li>
                <li>
                  Any damages, including loss of data, arising from the use of
                  our Services.
                </li>
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                10. Modification of Terms
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                We reserve the right to update these Terms at any time.
                Continued use of the site after changes are posted constitutes
                acceptance of the updated Terms.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">11. Termination</h2>
              <p className="text-lg text-gray-700 mb-4">
                We reserve the right to suspend or terminate access to the site
                at our discretion, including for violations of these Terms.
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">12. Contact Us</h2>
              <p className="text-lg text-gray-700 mb-4">
                For questions or concerns about these Terms, please contact us
                at:
              </p>
              <p className="text-lg text-blue-500">
                <a href="mailto:contact@foudrecipes.com">
                  contact@foudrecipes.com
                </a>
              </p>
            </section>
          </div>
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
