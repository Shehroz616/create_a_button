'use client'

import { useContext } from 'react';
import { ShapesContext } from '@/context/context';

const Texts = () => {

    const { shapes, updateShapes } = useContext(ShapesContext);
    const addText = (text, fontSize, w, h ) => {
        const newText = {
          id: Date.now(),
          type: 'text',
          text: text,
          x: 50 + shapes.length * 10,
          y: 50 + shapes.length * 10,
          width: w,
          height: h,
          fontSize: fontSize,
          fill: '#000',
        };
        updateShapes([...shapes, newText]);
    };
    return (
        <div className='grid lg:grid-cols-3 grid-cols-4 gap-3'>
            <div className="bg-white shadow-md p-1 rounded-md cursor-pointer aspect-square flex items-center justify-center"
                onClick={() => addText('Title', 36, 80, 40)}>
                <h1 className='text-3xl'>Title</h1>
            </div>
            <div className="bg-white shadow-md p-1 rounded-md cursor-pointer aspect-square flex items-center justify-center" 
                onClick={() => addText('Heading', 24, 100, 30)}>
                <h3 className='text-xl'>Hea...</h3>
            </div>
            <div className="bg-white shadow-md p-1 rounded-md cursor-pointer aspect-square flex items-center justify-center"
                 onClick={() => addText('Paragraph', 16, 100, 20)}>
                <p>Parag...</p>
            </div>
        </div>
    )
}

export default Texts