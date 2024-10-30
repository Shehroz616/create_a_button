'use client'

import { useContext } from 'react';
import { ShapesContext } from '@/context/context';

const Shapes = () => {

    const { shapes, setShapes } = useContext(ShapesContext);
    

    // Function to add shape to the canvas
    const addShape = (type) => {
        const newShape = {
            id: shapes.length + 1,
            type,
            x: 50 + shapes.length * 10, // Different position for each shape
            y: 50 + shapes.length * 10,
        };
        setShapes([...shapes, newShape]);
    };

    return (
        <div className='grid grid-cols-3 gap-4'>
            <div className="bg-white shadow-md p-1 rounded-md cursor-pointer"
                onClick={() => addShape('square')}>
                <div className='w-full aspect-square bg-gray-500 rounded-sm'></div>
            </div>
            <div className="bg-white shadow-md p-1 rounded-md cursor-pointer flex" 
                onClick={() => addShape('rectangle')}>
                <div className='w-full aspect-video bg-gray-500 rounded-sm m-auto'></div>
            </div>
            <div className="bg-white shadow-md p-1 rounded-md cursor-pointer"
                 onClick={() => addShape('circle')}>
                <div className='w-full aspect-square rounded-full bg-gray-500 m-auto'></div>
            </div>
        </div>
    )
}

export default Shapes