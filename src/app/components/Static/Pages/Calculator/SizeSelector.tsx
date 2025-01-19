"use client";
import React, { useState } from 'react';

interface SizeSelectorProps {
  onSizeChange: (width: number, aspectRatio: number, diameter: number) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ onSizeChange }) => {
  const [width, setWidth] = useState(215);
  const [aspectRatio, setAspectRatio] = useState(60);
  const [diameter, setDiameter] = useState(16);

  const handleSizeChange = () => {
    onSizeChange(width, aspectRatio, diameter);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Enter Tire Size</h2>
      <div className="flex space-x-2">
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          placeholder="Width"
          className="p-2 border rounded"
        />
        <input
          type="number"
          value={aspectRatio}
          onChange={(e) => setAspectRatio(Number(e.target.value))}
          placeholder="Aspect Ratio"
          className="p-2 border rounded"
        />
        <input
          type="number"
          value={diameter}
          onChange={(e) => setDiameter(Number(e.target.value))}
          placeholder="Diameter"
          className="p-2 border rounded"
        />
      </div>
      <button onClick={handleSizeChange} className="mt-2 p-2 bg-blue-500 text-white rounded">
        Calculate
      </button>
    </div>
  );
};

export default SizeSelector;
