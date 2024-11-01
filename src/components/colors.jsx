'use client';

import { useState } from 'react';
import { SketchPicker } from 'react-color';

const Colors = () => {
  const [color, setColor] = useState({ r: 255, g: 255, b: 255, a: 1 });

  const handleChangeComplete = (color) => {
    setColor(color.rgb);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 rounded-lg">
      <SketchPicker
        color={color}
        onChangeComplete={handleChangeComplete}
        className="custom-sketch-picker"
      />
      <div
        className="mt-4 w-16 h-16 rounded-full"
        style={{ backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` }}
      />
    </div>
  );
};

export default Colors;