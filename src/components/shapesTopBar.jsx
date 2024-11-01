import React, {useContext} from 'react'
import { Button } from './ui/button'
import { ShapesContext } from '@/context/context';

const ShapesTopBar = () => {
    const { setInnerMenuName,setSubActiveMenu } = useContext(ShapesContext);

    const handelClick = ()=>{
        setInnerMenuName('Colors')
        setSubActiveMenu(true)
    }
    return (
        <Button onClick={handelClick} variant="ghost" className="px-1 py-1 flex h-auto"><span className='h-5 w-5 rounded-full bg-gray-500'></span> Colors</Button>
    )
}

export default ShapesTopBar