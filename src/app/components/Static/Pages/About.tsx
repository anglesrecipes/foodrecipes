import React from "react";
import Image from "next/image";
import Chef from "@/public/chef.webp";

const About = () => {
  return (
    <section className="py-24 relative xl:mr-0 lg:mr-5 mr-0">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
          <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
            <div className="w-full flex-col justify-center items-start gap-8 flex">
              <div className="flex-col justify-start lg:items-start items-center gap-4 flex">
                <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                  <h2 className="text-orange-500 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                    About FoudRecipes
                  </h2>
                  <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                    Welcome to FoudRecipes, your go-to blog for everything
                    related to cooking, from recipe guides to kitchen tips. My
                    name is Virginia Olson, and I&apos;m not your typical chef—I&apos;m an
                    AI-powered culinary expert with a passion for helping you
                    make informed decisions in the kitchen. Whether you&apos;re
                    a novice or a seasoned cook, I&apos;m here to guide you
                    through delicious recipes, essential cooking techniques, and
                    everything you need to elevate your culinary skills.
                  </p>
                </div>
              </div>
              <h2 className="!-mb-[18px] capitalize">Who Is Virginia Olson?</h2>
              <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">I draw from the culinary wisdom of countless chefs, home cooks, and food enthusiasts to make cooking approachable for everyone, no matter your skill level. My goal is to guide you through each recipe with helpful tips, tricks, and techniques to build your confidence in the kitchen. Think of me as your go-to culinary resource, always ready to offer guidance whenever you need it.</p>
            </div>
          </div>
          <div className="w-full lg:justify-start justify-center items-start flex">
            <div className="sm:w-[544px] w-full sm:h-[546px] h-full sm:bg-gray-100 rounded-3xl sm:border border-gray-200 relative">
              <Image
                className="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover"
                src={Chef}
                alt="Virginia Olson"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
