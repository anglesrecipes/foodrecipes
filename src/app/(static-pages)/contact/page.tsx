import React from "react";
import { Metadata } from "next";
import ContactUS from "@/app/components/Static/Pages/Contact"

export const metadata: Metadata = {
  title: {
    default: "Contact",
    template: "%s | foudrecipes",
  },
  description: "Get in touch with our tire experts for personalized assistance. We're here to answer your questions and help with all your vehicle tire needs.",
  openGraph: {
    title: "Contact | foudrecipes",
    description: "Get in touch with our tire experts for personalized assistance. We're here to answer your questions and help with all your vehicle tire needs.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const ContactUs = () => {
  return (
    <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto md:px-6 pt-16">
      <ContactUS />
    </div>
  );
};

export default ContactUs;