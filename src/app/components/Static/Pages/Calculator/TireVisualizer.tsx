import React from 'react';

interface TireVisualizerProps {
  width: number;
  aspectRatio: number;
  diameter: number;
}

const TireVisualizer: React.FC<TireVisualizerProps> = ({ width, aspectRatio, diameter }) => {
  const tireHeight = (width * (aspectRatio / 100)) * 2 + diameter * 25.4; // Convert diameter to mm

  return (
    <div className="p-4 flex justify-center items-center">
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="100"
          cy="100"
          r={tireHeight / 10}
          stroke="black"
          strokeWidth="5"
          fill="none"
        />
        <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="14">
          {`${width}/${aspectRatio}R${diameter}`}
        </text>
      </svg>
    </div>
  );
};

export default TireVisualizer;
