import { Archivo } from "next/font/google";
import React from "react";
import RecentPosts from "@/app/components/Dynamic/Sidebar/RecentPosts";
import About from "@/app/components/Dynamic/Sidebar/About";
import SideNewsletter from "@/app/components/Dynamic/Sidebar/Newsletter";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-old-standard-tt",
});

interface PageProps {
  page: {
    title: {
      rendered: string;
    };
    content: {
      rendered: string;
    };
    slug: string;
  };
}

export default function PagePage({ page }: PageProps) {
  return (
    <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto md:px-6 mt-16 mb-16">
      <div className="lg:flex gap-16">
        <div className="lg:w-9/12 lg:border-r-[1px] lg:border-slate-200 lg:pr-10">
          <article>
            <h1
              className={`${archivo.className} text-2xl md:text-4xl font-bold text-gray-900 mb-10 text-center decoration-amber-700 underline`}
            >
              {page.title.rendered}
            </h1>
          </article>
          <section>
            <div
              className="post_content"
              dangerouslySetInnerHTML={{ __html: page.content.rendered }}
            />
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
}
