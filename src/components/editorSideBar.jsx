'use client'

import React, { useState } from 'react';
import { Square, Type, Image, UploadCloud } from 'lucide-react';
import { Button } from './ui/button'
import Shapes from './shapes';

const Sidebar = () => {

    const [activeMenu, setActiveMenu] = useState(null);
    const [menuName, setMenuName] = useState('');

    // Content based on the active menu
    const renderContent = () => {
        switch (activeMenu) {
            case 'Shapes':
                return <Shapes />
            case 'Text':
                
                return <div>Text content here...</div>;
            case 'Images':
                
                return <div>Images content here...</div>;
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
        <div className='flex items-stretch'>
            <div className="w-20 border-r border-gray-300 bg-gray-100 backdrop-blur-lg transition-all flex flex-col items-center py-3 px-1  space-y-4">
                <Button variant="ghost"
                    className={`flex flex-col items-center  py-7 w-full ${activeMenu === 'Shapes' ? 'bg-white shadow hover:bg-white' : null}`}
                    onClick={() => handleMenuClick('Shapes')}>
                    <Square className="w-6 h-6 mb-0" />
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
            <div
                className={`border-r border-gray-200 bg-gray-100 backdrop-blur-lg transition-all duration-300 overflow-hidden ${activeMenu ? 'w-64' : 'w-0'} overflow-hidden border-l border-gray-300`}>
                <div className='p-4 border-b border-gray-300'>
                    {menuName}
                </div>
                <div className='p-4 w-max min-w-full'>

                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
