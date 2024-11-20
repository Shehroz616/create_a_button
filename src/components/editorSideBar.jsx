'use client'

import React, { useState, useContext } from 'react';
import { ShapesContext } from '@/context/context';
import { Shapes, Square, Type, Image, UploadCloud, X } from 'lucide-react';
import { Button } from './ui/button'
import ShapesMenu from './shapes';
import Colors from './colors';
import Texts from './texts';
import Images from './images';

const Sidebar = () => {

    const [activeMenu, setActiveMenu] = useState(null);
    const [menuName, setMenuName] = useState('');
    const { innerMenuName, subActiveMenu, setSubActiveMenu} = useContext(ShapesContext);

    // Content based on the active menu
    const renderContent = () => {
        switch (activeMenu) {
            case 'Shapes':
                return <ShapesMenu />
            case 'Text':
                return <Texts />;
            case 'Images':

                return <Images />;
            case 'Uploads':

                return <div>Uploads content here...</div>;
            default:
                return;
        }
    };

    const handleMenuClick = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);
        setMenuName(activeMenu === menu ? '' : menu);
    };

    return (
        <div className='flex items-stretch lg:flex-row flex-col-reverse'>
            <div className="z-50 lg:w-20 w-full border-r border-gray-300 bg-gray-100 backdrop-blur-lg transition-all flex lg:flex-col flex-row items-center py-3 px-1  lg:space-y-4">
                <Button variant="ghost"
                    className={`flex flex-col items-center  py-7 w-full ${activeMenu === 'Shapes' ? 'bg-white shadow hover:bg-white' : null}`}
                    onClick={() => handleMenuClick('Shapes')}>
                    <Shapes className="w-6 h-6 mb-0" />
                    <span className="text-xs">Shapes</span>
                </Button>

                <Button variant="ghost"
                    className={`flex flex-col items-center py-7 w-full ${activeMenu === 'Text' ? 'bg-white shadow hover:bg-white' : null}`}
                    onClick={() => handleMenuClick('Text')}>
                    <Type className="w-6 h-6 mb-0" />
                    <span className="text-xs">Text</span>
                </Button>

                <Button variant="ghost"
                    className={`flex flex-col items-center py-7 w-full ${activeMenu === 'Images' ? 'bg-white shadow hover:bg-white' : null}`}
                    onClick={() => handleMenuClick('Images')}>
                    <Image className="w-6 h-6 mb-0" />
                    <span className="text-xs">Images</span>
                </Button>

                <Button variant="ghost"
                    className={`flex flex-col items-center py-7 w-full ${activeMenu === 'Uploads' ? 'bg-white shadow hover:bg-white' : null}`}
                    onClick={() => handleMenuClick('Uploads')}>
                    <UploadCloud className="w-6 h-6 mb-0" />
                    <span className="text-xs">Uploads</span>
                </Button>

            </div>
            <div className={`lg:relative absolute lg:bottom-auto bottom-20 transition-all w-full duration-300 ${activeMenu || subActiveMenu ? 'lg:w-64  lg:h-auto h-96 ' : 'lg:w-0  h-0 lg:h-auto'} `}>
                <div
                    className={`relative z-30 border-r border-l border-gray-300 bg-gray-100 transition-all duration-300 w-full  ${activeMenu ? 'lg:w-64 h-96' : 'lg:w-0 h-0'} overflow-hidden  lg:h-full`}>
                    <div className='flex justify-between px-4 py-3 border-b border-gray-300'>
                        {menuName}
                        <Button className="p-0 h-auto" variant="ghost" onClick={() => setActiveMenu(null)}>
                            <X size={20} color="#454545" strokeWidth={1.25} />
                        </Button>
                    </div>
                    <div className='p-4 min-w-full'>
                        {renderContent()}
                    </div>
                </div>
                <div className={`z-40 absolute top-0 left-0 lg:h-full transition-all duration-300 overflow-hidden w-full ${subActiveMenu ? 'lg:w-64 h-96' : 'lg:w-0 h-0'} bg-gray-100`}>
                    <div className='flex justify-between px-4 py-3 border-b border-gray-300'>
                        {innerMenuName}
                        <Button className="p-0 h-auto" variant="ghost" onClick={() => setSubActiveMenu(null)}>
                            <X size={20} color="#454545" strokeWidth={1.25} />
                        </Button>
                    </div>
                    <div className='p-4 w-max min-w-full'>
                        <Colors/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
