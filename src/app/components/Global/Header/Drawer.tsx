"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { LuMenu } from "react-icons/lu";
import { MdOutlineClose } from "react-icons/md";
import DrawerMenu from "@/app/components/Global/Header/DrawerMenu";
import LOGO from "@/public/foudrecipes.svg"
import Image from "next/image";

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setIsAnimating(true);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300); // Match this with the transition duration
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <div>
      <button className="block lg:hidden" onClick={toggleDrawer}>
        <LuMenu className="text-black size-8 ml-4" />
      </button>
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-95 z-40 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed left-5 top-5 bottom-5 right-5 w-100 rounded-2xl bg-white p-8 transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            <nav className="">
              <div
                className={`text-black text-2xl font-bold flex justify-between items-center border-b-[1px] border-slate-200 pb-8`}
              >
                <Link href="/">
                  <Image src={LOGO} alt="Tasty Eats Logo" width={140} height={100} />
                </Link>
                <button onClick={toggleDrawer} className="">
                  <MdOutlineClose className={`text-gray-900 size-8`} />
                </button>
              </div>
              <DrawerMenu />
            </nav>
          </div>
          <div>dsfdgbdf</div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
