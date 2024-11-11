'use client'

import { useContext } from 'react';
import { ShapesContext } from '@/context/context';

const Shapes = () => {

    const { shapes, updateShapes } = useContext(ShapesContext);
    

    // Function to add shape to the canvas
    const addShape = (type,width,height,radius) => {
        const newShape = {
            id: shapes.length + 1,
            fill:"gray",
            type,
            x: 150 + shapes.length * 10, // Different position for each shape
            y: 150 + shapes.length * 10,
            width: width,
            height: height,
        };
        if (radius!==0){
            newShape.radius = radius
            
        }

        updateShapes([...shapes, newShape]);
    };

    return (
        <div className='grid grid-cols-3 gap-4'>
            <div className="bg-white shadow-md p-1 rounded-md cursor-pointer"
                onClick={() => addShape('square',100,100)}>
                <div className='w-full aspect-square bg-gray-500 rounded-sm'></div>
            </div>
            <div className="bg-white shadow-md p-1 rounded-md cursor-pointer flex" 
                onClick={() => addShape('rectangle',150,80)}>
                <div className='w-full aspect-video bg-gray-500 rounded-sm m-auto'></div>
            </div>
            <div className="bg-white shadow-md p-1 rounded-md cursor-pointer"
                 onClick={() => addShape('circle',0,0,80)}>
                <div className='w-full aspect-square rounded-full bg-gray-500 m-auto'></div>
            </div>
        </div>
    )
}

export default Shapes