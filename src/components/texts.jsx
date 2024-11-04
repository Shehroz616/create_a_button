'use client'

import { useContext } from 'react';
import { ShapesContext } from '@/context/context';

const Texts = () => {

    const { shapes, setShapes } = useContext(ShapesContext);
    const addText = (text, fontSize) => {
        const newText = {
          id: Date.now(),
          type: 'text',
          text: text,
          x: 50,
          y: 50,
          fontSize: fontSize,
          fill: '#000',
        };
        setShapes([...shapes, newText]);
    };
    return (
        <div className='grid grid-cols-3 gap-3'>
            <div className="bg-white shadow-md p-1 rounded-md cursor-pointer aspect-square flex items-center justify-center"
                onClick={() => addText('Title', 36)}>
                <h1 className='text-3xl'>Title</h1>
            </div>
            <div className="bg-white shadow-md p-1 rounded-md cursor-pointer aspect-square flex items-center justify-center" 
                onClick={() => addText('Heading', 24)}>
                <h3 className='text-xl'>Hea...</h3>
            </div>
            <div className="bg-white shadow-md p-1 rounded-md cursor-pointer aspect-square flex items-center justify-center"
                 onClick={() => addText('Paragraph', 16)}>
                <p>Parag...</p>
            </div>
        </div>
    )
}

export default Texts