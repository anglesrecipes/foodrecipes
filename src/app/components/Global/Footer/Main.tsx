import React from "react";
import UnselfLinks from "@/app/components/Global/Footer/UnselfLinks";
import QuickLinks from "@/app/components/Global/Footer/QuickLinks";
import Link from "next/link";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaPinterest,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Newsletter from "@/app/components/Global/Footer/Newsletter";

const Main = () => {
  return (
    <footer className="bg-white shadow-2xl py-10 pb-4">
      <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto md:px-6">
        <div className="lg:flex gap-10">
          <section className="lg:w-4/12 mt-8 lg:mt-0">
            <h2 className="text-xl text-gray-900 font-bold -mb-3 uppercase">
              Who We Are?
            </h2>
            <div className="bg-orange-200 h-[10px] max-w-[145px] mb-5"></div>
            <p className="text-md text-slate-500 mb-5">
              At FoodRecipes, we celebrate the joy of cooking with easy,
              reliable recipes and expert tips for every home chef&#39;s
              culinary journey!
            </p>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm uppercase">
                Let&#39;s be friends:
              </span>
              <ul className="flex items-center gap-1">
                {[
                  {
                    href: "https://www.facebook.com/foudrecipes/",
                    icon: <FaFacebookSquare />,
                    label: "Facebook",
                  },
                  {
                    href: "https://x.com/foudrecipes",
                    icon: <FaSquareXTwitter />,
                    label: "Twitter",
                  },
                  {
                    href: "https://www.instagram.com/foudrecipes/",
                    icon: <FaInstagramSquare />,
                    label: "Instagram",
                  },
                  {
                    href: "https://www.pinterest.com/VirginiaOlson33/",
                    icon: <FaPinterest />,
                    label: "Pinterest",
                  },
                ].map(({ href, icon, label }, index) => (
                  <li key={index}>
                    <Link href={href} aria-label={label}>
                      {React.cloneElement(icon, {
                        className:
                          "size-7 text-gray-650 transition-all duration-300 hover:text-gray-900",
                      })}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="lg:w-2/12 mt-8 lg:mt-0">
            <h3 className="text-xl text-gray-900 font-bold -mb-3 uppercase">
              Quick Links
            </h3>
            <div className="bg-orange-200 h-[10px] max-w-[130px] mb-5"></div>
            <QuickLinks />
          </section>

          <section className="lg:w-2/12 mt-8 lg:mt-0">
            <h3 className="text-xl text-gray-900 font-bold -mb-3 uppercase">
              Unself Links
            </h3>
            <div className="bg-orange-200 h-[10px] max-w-[140px] mb-5"></div>
            <UnselfLinks />
          </section>

          <section className="lg:w-4/12 mt-8 lg:mt-0">
            <h3 className="text-xl text-gray-900 font-bold -mb-3 uppercase">
              Keep In Touch
            </h3>
            <div className="bg-orange-200 h-[10px] max-w-[160px] mb-5"></div>
            <p className="text-zinc-800 text-md">
              Stay informed about the latest trends in seating plans!
            </p>
            <div className="my-3">
              <Newsletter />
            </div>
            <p className="text-slate-600 text-sm">
              We will not send you spam. Unsubscribe at any time.
            </p>
          </section>
        </div>
        <div className="border-t border-slate-200 my-2.5 pt-6 text-center mt-5">
          © 2025{" "}
          <Link href="/" className="font-semibold">
            FoudRecipes
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Main;
