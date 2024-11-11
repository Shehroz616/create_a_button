import React, {useContext} from 'react'
import { Button } from './ui/button'
import { ShapesContext } from '@/context/context';

const DefaultTopBar = () => {
    return (
        <>
            <div className="flex items-center">
                <span>Sizes:</span> 
                <Button  variant="ghost" className="px-1 py-1 flex h-auto"><span className='h-5 w-5 rounded-full bg-gray-400'></span> 1 inch</Button>
                <Button  variant="ghost" className="px-1 py-1 flex h-auto"><span className='h-5 w-5 rounded-full bg-gray-400'></span> 2 inch</Button>
            </div>
        </>
    )
}

export default DefaultTopBar