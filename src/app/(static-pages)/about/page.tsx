import React from "react";
import { Metadata } from "next";
import About from "@/app/components/Static/Pages/About";

export const metadata: Metadata = {
  title: {
    default: "About",
    template: "%s | Foudrecipes",
  },
  description: "Discover our story as trusted tire experts. Learn about our commitment to quality service, automotive expertise, and dedication to customer safety.",
  openGraph: {
    title: "About | foudrecipes",
    description: "Discover our story as trusted tire experts. Learn about our commitment to quality service, automotive expertise, and dedication to customer safety.",
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

const Aboutus = () => {
  return <About />;
};

export default Aboutus;
