'use client'

import Navbar from "@/components/Navbar";
import { createContext, useState } from "react";

export const ShapesContext = createContext()

export const MyProvider = ({ children }) => {

  const [shapes, setShapes] = useState([]);
  const [shapesTopBar, setshapesTopBar] = useState(false);
  const [innerMenuName, setInnerMenuName] = useState('');
  const [subActiveMenu, setSubActiveMenu] = useState(false);
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const updateShapes = (newShapes) => {
    console.log(undoStack);
    setUndoStack([...undoStack, shapes]);
    setRedoStack([]);
    setShapes(newShapes);
  };


  return (
    <ShapesContext.Provider value={{ shapes, setShapes, shapesTopBar, setshapesTopBar,innerMenuName,setInnerMenuName,subActiveMenu, setSubActiveMenu, selectedShapeId, setSelectedShapeId, undoStack, setUndoStack, redoStack, setRedoStack, updateShapes }}>
      {children}
    </ShapesContext.Provider>
  );
};
