"use client";
import React, { useState } from 'react';

interface VehicleSelectorProps {
  onSelect: (size: string) => void;
}

const VehicleSelector: React.FC<VehicleSelectorProps> = ({ onSelect }) => {
  const [vehicle, setVehicle] = useState('');

  const handleSelect = () => {
    // Fetch tire sizes for the selected vehicle (mock data for now)
    const tireSize = '215/60R16'; // Example size
    onSelect(tireSize);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Select Vehicle</h2>
      <input
        type="text"
        value={vehicle}
        onChange={(e) => setVehicle(e.target.value)}
        placeholder="Enter vehicle model"
        className="p-2 border rounded w-full"
      />
      <button onClick={handleSelect} className="mt-2 p-2 bg-blue-500 text-white rounded">
        Find Tire Size
      </button>
    </div>
  );
};

export default VehicleSelector;
