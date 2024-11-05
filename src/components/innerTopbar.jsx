'use client'

import ShapesTopBar from './shapesTopBar';
import { useContext } from 'react';
import { ShapesContext } from '@/context/context';

const InnerTopBar = () => {
    const {shapesTopBar} = useContext(ShapesContext);
    return (
        <div className="h-12 flex items-center justify-between bg-gray-200 backdrop-blur-lg transition-all p-3 ">
            <div className="flex space-x-4">
                {shapesTopBar? <ShapesTopBar/>:null}
            </div>
        </div>
    );
};

export default InnerTopBar;
