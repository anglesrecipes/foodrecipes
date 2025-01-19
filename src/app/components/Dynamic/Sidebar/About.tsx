import React from "react";
import { author_details } from "@/apis/graphql/author";
import Image from "next/image";
import Chef from "@/public/chef.webp";

const sanitizeHtml = (html: string) => {
  // Basic sanitization - remove HTML tags
  return html.replace(/<[^>]*>/g, "");
};

const truncateContent = (content: string, maxLength: number) => {
  // First sanitize the HTML content
  const sanitizedContent = sanitizeHtml(content);
  // Then truncate
  return sanitizedContent.length > maxLength
    ? sanitizedContent.substring(0, maxLength) + "..."
    : sanitizedContent;
};

const About = async () => {
  const author = await author_details();

  return (
    <div className="mb-8">
      <h2 className="text-3xl text-gray-900 font-bold -mb-3">About me</h2>
      <div className="bg-amber-200 h-[10px] max-w-[135px] mb-5"></div>
      <div className="relative overflow-hidden flex justify-center items-start">
        <Image
          className="w-full object-contain"
          src={Chef}
          alt={author!.name}
          title={author!.name}
          width={0}
          height={0}
          quality={100}
          objectFit="contain"
          layout="responsive"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-amber-800/45 to-transparent opacity-75`} title={author!.name}
        ></div>
      </div>
      <div className="mt-3">
        <p className="text-slate-800 text-[15px]">
          {truncateContent(author!.description, 200)}
        </p>
      </div>
    </div>
  );
};

export default About;
