'use client'

import { createContext, useState } from "react";

export const ShapesContext = createContext()

export const MyProvider = ({ children }) => {
  const [shapes, setShapes] = useState([]);

  return (
    <ShapesContext.Provider value={{ shapes, setShapes }}>
      {children}
    </ShapesContext.Provider>
  );
};
