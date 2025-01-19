import React from "react";
import Link from "next/link";
import Image from "next/image";
import LOGO from "@/public/foudrecipes.svg"

const Logo = () => {
  return (
    <div>
      <Link href="/">
      <Image src={LOGO} alt="Tasty Eats Logo" width={140} height={100} />
      </Link>
    </div>
  );
};

export default Logo;