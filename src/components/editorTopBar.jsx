'use client'

import { Undo, Redo, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from './ui/button'
import Link from 'next/link';
import { useContext } from 'react';
import { ShapesContext } from '@/context/context';

const TopBar = () => {

    const { shapes, setShapes, undoStack, setUndoStack, redoStack, setRedoStack } = useContext(ShapesContext);

    const handleUndo = () => {
        if (undoStack.length > 0) {
          const previousShapes = undoStack.pop();
          setRedoStack([...redoStack, shapes]);
          setShapes(previousShapes);
          setUndoStack([...undoStack]);
        }
    };

    const handleRedo = () => {
        if (redoStack.length > 0) {
          const nextShapes = redoStack.pop();
          setUndoStack([...undoStack, shapes]);
          setShapes(nextShapes);
          setRedoStack([...redoStack]);
        }
    };


    return (
        <div className="flex items-center justify-between bg-gray-50 transition-all p-3 ">
            <Link href='/' className='flex z-40 font-semibold'>
                CreateA<span className='text-green-600'> Button</span>
            </Link>
            <div className="flex space-x-2 items-center">
                <Button variant="ghost" className="flex items-center py-1 px-2 rounded-sm h-auto bg-white shadow-sm" onClick={handleUndo}>
                    <Undo className="text-green-600" />
                </Button>

                <Button variant="ghost" className="flex items-center py-1 px-2 rounded-sm h-auto bg-white shadow-sm" onClick={handleRedo}>
                    <Redo className="text-green-600" />
                </Button>

                <Button variant="ghost"className="flex items-center py-1 px-2 rounded-sm h-auto bg-white shadow-sm" onClick={() => console.log('Zoom In')}>
                    <ZoomIn className="text-green-600" />
                </Button>

                <Button variant="ghost" className="flex items-center py-1 px-2 rounded-sm h-auto bg-white shadow-sm" onClick={() => console.log('Zoom Out')}>
                    <ZoomOut className="text-green-600" />
                </Button>
            </div>
        </div>
    );
};

export default TopBar;
