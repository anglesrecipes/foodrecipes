import React from "react";
import Image from "next/image";
import Link from "next/link";
import { author_details } from "@/apis/graphql/author";

const About = async () => {
  const author = await author_details();

  if (!author) {
    return <p>Author not found</p>;
  }

  return (
    <section className="py-16 bg-white mb-14" aria-label="About Me Section">
      <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto md:px-6">
        <div className="lg:flex gap-16">
          <div className="lg:w-4/12 mb-7 lg:mb-0">
            <div className="relative overflow-hidden rounded-md flex justify-center items-start">
              <Image
                className="max-w-[300px] lg:max-w-full mask mask-squircle object-contain"
                src={author.avatar.url}
                alt={`Avatar of ${author.name}`}
                title={author.name}
                loading="lazy"
                width={500}
                height={500}
                quality={100}
                objectFit="contain"
                layout="responsive"
              />
              <div
                className={`absolute inset-0 mask mask-squircle bg-gradient-to-t from-amber-300/45 to-transparent opacity-75`}
                title={author.name}
              />
            </div>
          </div>
          <div className="lg:w-8/12">
            <div className="h-full flex justify-center items-start flex-col">
              <h3 className="text-center w-full lg:text-left text-3xl lg:text-6xl text-gray-900 font-bold mb-4">
                {author.name}
              </h3>
              <p className="text-slate-500 text-center lg:text-left text-md lg:text-lg mb-6">
                {author.description}
              </p>
              <Link
                href="/about"
                className="text-center lg:text-left w-full text-md font-semibold text-gray-950 underline underline-offset-[3px] decoration-amber-600 capitalize"
                aria-label={`Learn more about ${author.name}`}
              >
                <span className="animated-underline">Learn more here</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
