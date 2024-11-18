'use client';

import { useState, useContext } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { ShapesContext } from '@/context/context';

const Colors = () => {
  const [color, setColor] = useState('#121212');
  const [localColor, setLocalColor] = useState('#121212');
  const { shapes, selectedShapeId, updateShapes } = useContext(ShapesContext);

  const updateColorComplete = (e) => {
    console.log(e);
    const newShapes = shapes.map((shape) => {
      if (shape.id === selectedShapeId) {
        return { ...shape, fill: e };
      }
      return shape;
    });
    setColor(e);
    updateShapes(newShapes);
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 rounded-lg">
      <HexColorPicker
        color={color}
        onChange={updateColorComplete}
      />
      <div className="flex justify-between mt-5 items-center">
        <span>Hex</span>
        <HexColorInput
          color={color}
          onChange={updateColorComplete}
          className="outline-0 bg-gray-100 py-1 px-3 w-7/12 text-sm border border-gray-300 rounded-sm"
        />
      </div>
    </div>
  );
};

export default Colors;