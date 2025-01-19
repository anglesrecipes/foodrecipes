"use client";
import { useState } from "react";
import VehicleSelector from "@/app/components/Static/Pages/Calculator/VehicleSelector";
import SizeSelector from "@/app/components/Static/Pages/Calculator/SizeSelector";
import TireVisualizer from "@/app/components/Static/Pages/Calculator/TireVisualizer";

export default function Home() {
  const [tireWidth, setTireWidth] = useState(215);
  const [aspectRatio, setAspectRatio] = useState(60);
  const [diameter, setDiameter] = useState(16);

  const handleSizeChange = (width: number, ratio: number, dia: number) => {
    setTireWidth(width);
    setAspectRatio(ratio);
    setDiameter(dia);
  };

  return (
    <main className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold">Tire Size Calculator</h1>
      <VehicleSelector onSelect={(size) => console.log(size)} />
      <SizeSelector onSizeChange={handleSizeChange} />
      <TireVisualizer
        width={tireWidth}
        aspectRatio={aspectRatio}
        diameter={diameter}
      />
    </main>
  );
}
