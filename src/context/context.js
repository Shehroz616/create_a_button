'use client'

import { createContext, useState } from "react";

export const ShapesContext = createContext()

export const MyProvider = ({ children }) => {
  const [shapes, setShapes] = useState([]);
  const [shapesTopBar, setshapesTopBar] = useState(false);
  const [innerMenuName, setInnerMenuName] = useState('');
  const [subActiveMenu, setSubActiveMenu] = useState(false);
  const [selectedShapeId, setSelectedShapeId] = useState(null);


  return (
    <ShapesContext.Provider value={{ shapes, setShapes, shapesTopBar, setshapesTopBar,innerMenuName,setInnerMenuName,subActiveMenu, setSubActiveMenu, selectedShapeId, setSelectedShapeId }}>
      {children}
    </ShapesContext.Provider>
  );
};
