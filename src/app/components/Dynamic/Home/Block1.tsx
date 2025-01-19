import React, { Suspense } from "react";
import Image from "next/image";
import { getCategories } from "@/apis/graphql/categories";
import Link from "next/link";
import { Archivo } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-old-standard-tt",
});

interface Category {
  id: string;
  name: string;
  slug: string;
  categoryImage: string;
}

const LoadingItem: React.FC = () => (
  <article className="relative h-[250px] bg-gray-100 rounded-lg overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-gray-600 text-lg font-medium">
        Loading...
      </span>
    </div>
  </article>
);

const CategoryGrid: React.FC<{ categories: Category[] }> = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {categories.map((category) => (
        <article key={category.id} className="relative h-[250px] overflow-hidden">
          <Link
            href={`/${category.slug}`}
            aria-label={`Explore Tires in ${category.name} category`}
          >
            <div className="relative h-full" title={category.name}>
              <Image
                className="object-cover"
                src={category.categoryImage}
                alt={`Image of ${category.name} category`}
                title={category.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                placeholder="blur"
                blurDataURL={category.categoryImage}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/65 to-transparent flex justify-center items-end p-4">
                <h4 className={`${archivo.className} bg-white px-4 py-1 text-xl lg:text-2xl font-semibold rounded`}>
                  {category.name}
                </h4>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
};

const LoadingGrid: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
    {[...Array(count)].map((_, index) => (
      <LoadingItem key={index} />
    ))}
  </div>
);

const Block1 = async () => {
  const categories = await getCategories();
  const categoryCount = categories.length || 3;

  return (
    <section
      className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto md:px-6 mb-14"
      aria-label="Browser by Category"
    >
      <header className="flex justify-center items-center flex-col">
        <h3 className={`${archivo.className} text-gray-900 font-bold mb-5 text-3xl text-center`}>
          Browse our{" "}
          <span className="bg-orange-500 rounded text-gray-900 pb-0.5 px-2">
            categories
          </span>
        </h3>
        <p className="text-slate-700 max-w-[550px] text-center mb-8">
          Explore various tire categories, helping you find the ideal tires for your vehicle&apos;s performance and maintenance needs.
        </p>
      </header>

      <Suspense fallback={<LoadingGrid count={categoryCount} />}>
        <CategoryGrid categories={categories} />
      </Suspense>
    </section>
  );
};

export default Block1;