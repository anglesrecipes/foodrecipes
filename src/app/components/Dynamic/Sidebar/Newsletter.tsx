import React from "react";
import NewsForm from "@/app/components/Static/Sidebar/NewsForm";
import Link from "next/link";

const SideNewsletter = async () => {
  return (
    <div className="mb-8">
      <h2 className="text-3xl text-gray-900 font-bold -mb-3">Newsletter</h2>
      <div className="bg-amber-200 h-[10px] max-w-[150px] mb-5"></div>
      <p className="text-slate-800 text-sm -mt-3 mb-3">
        Subscribe to our newsletter for the latest news, updates, and exclusive
        offers.
      </p>
      <div className="my-3">
        <NewsForm />
      </div>
      <p className="text-xs text-slate-800 mt-2">
        By submitting your information you agree to the{" "}
        <Link href="/terms-conditions" className="text-slate-500">
          Terms & Conditions
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="text-slate-500">
          Privacy Policy
        </Link>{" "}
        and are aged 16 or over.
      </p>
    </div>
  );
};

export default SideNewsletter;