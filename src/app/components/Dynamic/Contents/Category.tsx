// Category.tsx
import React from "react";
import { GoChevronRight } from "react-icons/go";
import { Archivo } from "next/font/google";
import Link from "next/link";
import RecentPosts from "@/app/components/Dynamic/Sidebar/RecentPosts";
import About from "@/app/components/Dynamic/Sidebar/About";
import SideNewsletter from "@/app/components/Dynamic/Sidebar/Newsletter";
import CategoryPosts from "./CategoryPosts";
import { Post } from "@/types"; // Import the Post type

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-old-standard-tt",
});

interface CategoryProps {
  category: {
    categoryImage: string;
    id: number;
    name: string;
    description: string;
    slug: string;
  };
  initialPosts: Post[]; // Use the Post type here
  totalPages: number;
}

export default function Category({
  category,
  initialPosts,
  totalPages,
}: CategoryProps) {
  return (
    <main>
      <header className="bg-white pt-5 py-2.5">
        <nav
          className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto md:px-6"
          aria-label="Breadcrumb"
        >
          <ol className="flex justify-start items-center gap-2 !mb-0">
            <li>
              <Link
                href="/"
                className="text-slate-800 transition-all hover:text-amber-950 font-semibold text-sm"
              >
                Home
              </Link>
            </li>
            <li>
              <GoChevronRight className="text-slate-400" aria-hidden="true" />
            </li>
            <li
              className="text-slate-800 transition-all hover:text-amber-950 font-semibold text-sm"
              aria-current="page"
            >
              {category.name}
            </li>
          </ol>
        </nav>
      </header>

      <section className="py-10 pb-0 bg-white relative">
        <div className="relative h-full">
          <div
            className="p-16 bg-cover bg-center h-full"
            style={{ backgroundImage: `url(${category.categoryImage})` }}
          >
            <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto md:px-6">
              <h1
                className={`text-4xl relative z-50 text-center md:text-5xl md:leading-[60px] text-white font-black mb-5 ${archivo.className}`}
              >
                {category.name}
              </h1>
              <p className="text-orange-50 relative z-50 text-md lg:text-xl text-center max-w-4xl mx-auto">
                {category.description}
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-40 opacity-75"></div>
        </div>
      </section>

      <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto md:px-6 mt-16 mb-16">
        <div className="lg:flex gap-12 mt-5">
          <section className="lg:w-9/12 lg:border-r-[2px] lg:border-slate-100 lg:pr-12">
            <h2
              className={`${archivo.className} text-4xl -mb-3.5 text-gray-900 font-black relative z-30`}
            >
              Featured Articles
            </h2>
            <div className="h-2.5 bg-amber-200 mb-7 max-w-[280px]"></div>

            <CategoryPosts
              initialPosts={initialPosts}
              categoryId={category.id}
              totalPages={totalPages}
            />
          </section>

          <aside className="lg:w-3/12">
            <About />
            <SideNewsletter />
            <RecentPosts />
          </aside>
        </div>
      </div>
    </main>
  );
}
