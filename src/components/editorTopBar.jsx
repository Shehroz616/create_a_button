'use client'

import { Undo, Redo, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from './ui/button'
import Link from 'next/link';

const TopBar = () => {
    return (
        <div className="flex items-center justify-between border-b border-gray-300 bg-white/75 backdrop-blur-lg transition-all p-3 ">
            <Link href='/' className='flex z-40 font-semibold'>
                CreateA<span className='text-green-600'> Button</span>
            </Link>
            <div className="flex space-x-4">
                <Button className="flex items-center" onClick={() => console.log('Undo')}>
                    <Undo className="text-white" />
                    <span className="text-white">Undo</span>
                </Button>

                <Button className="flex items-center" onClick={() => console.log('Redo')}>
                    <Redo className="text-white" />
                    <span className="text-white">Redo</span>
                </Button>

                <Button className="flex items-center" onClick={() => console.log('Zoom In')}>
                    <ZoomIn className="text-white" />
                    <span className="text-white">Zoom In</span>
                </Button>

                <Button className="flex items-center" onClick={() => console.log('Zoom Out')}>
                    <ZoomOut className="text-white" />
                    <span className="text-white">Zoom Out</span>
                </Button>
            </div>
        </div>
    );
};

export default TopBar;
