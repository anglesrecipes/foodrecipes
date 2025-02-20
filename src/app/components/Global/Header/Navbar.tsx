import React from "react";
import Logo from "@/app/components/Global/Header/Logo";
import Menu from "@/app/components/Global/Header/Menu";
import CallToAction from "@/app/components/Global/Header/CallToAction";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaPinterest,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="bg-orange-500 text-white text-sm text-center py-2.5 italic">
        <div>
          <ul className="flex justify-center items-center gap-2">
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
              <li key={index} className="">
                <Link
                  href={href}
                  aria-label={label}
                  className="flex justify-center items-center gap-1"
                >
                  {React.cloneElement(icon, {
                    className:
                      "size-6 text-gray-650 transition-all duration-300 hover:text-gray-900",
                  })}
                  <span className="hidden lg:block">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <nav
        className="py-2.5 sticky top-0 z-50 bg-white shadow"
        role="navigation"
      >
        <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto md:px-6">
          <div className="flex justify-between items-center">
            <div className="flex justify-center items-center gap-16">
              <Logo />
            </div>
            <Menu />
            <div>
              <CallToAction />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
