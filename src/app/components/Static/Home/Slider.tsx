import React from "react";
import SliderImg from "@/public/slider.png";

const Slider = () => {
  return (
    <div
      className="h-28 lg:h-96 bg-center mb-14 -mt-14 lg:-mt-0 lg:mb-24 bg-no-repeat bg-contain lg:bg-cover"
      style={{
        backgroundImage: `url(${SliderImg.src})`,
        height: "384px",
        widows: "100%",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    ></div>
  );
};

export default Slider;
