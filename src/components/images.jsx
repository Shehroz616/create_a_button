'use client'

import { useContext, useEffect, useState } from 'react';
import { ShapesContext } from '@/context/context';

const Images = () => {

    const { shapes, updateShapes } = useContext(ShapesContext);
    const [image, setImage] = useState(null);
    const loadImage = (src) => {
        const image = new window.Image();
        image.src = src;
        image.onload = () => {
            setImage(image);
        };
        const newImage = {
          id: Date.now(),
          type: 'image',
          img: image,
          x: 50 + shapes.length * 10,
          y: 50 + shapes.length * 10,
        };
        updateShapes([...shapes, newImage]);
    };
    return (
        <div className='grid grid-cols-3 gap-3'>
            <div className="bg-white shadow-md p-1 rounded-md cursor-pointer aspect-square flex items-center justify-center">
                <img src="/users/user-1.png" className='rounded-sm' alt="" onClick={() => loadImage('/users/user-1.png')}/>
            </div>
            <div className="bg-white shadow-md p-1 rounded-md cursor-pointer aspect-square flex items-center justify-center">
                <img src="/users/user-2.png" className='rounded-sm' alt="" onClick={() => loadImage('/users/user-2.png')}/>
            </div>
            <div className="bg-white shadow-md p-1 rounded-md cursor-pointer aspect-square flex items-center justify-center">
                <img src="/users/user-3.png" className='rounded-sm' alt="" onClick={() => loadImage('/users/user-3.png')}/>
            </div>
            <div className="bg-white shadow-md p-1 rounded-md cursor-pointer aspect-square flex items-center justify-center">
                <img src="/users/user-4.jpg" className='rounded-sm' alt="" onClick={() => loadImage('/users/user-4.jpg')}/>
            </div>
            <div className="bg-white shadow-md p-1 rounded-md cursor-pointer aspect-square flex items-center justify-center">
                <img src="/users/user-5.jpg" className='rounded-sm' alt="" onClick={() => loadImage('/users/user-5.jpg')}/>
            </div>
        
        </div>
    )
}

export default Images