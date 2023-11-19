import React from 'react';
import { useLocation } from 'react-router-dom';

const NotFound = () => {
    const { pathname } = useLocation();

    return (
        <div className='flex items-center justify-center w-full min-h-[30vh]'>
            <h1 className=' text-blue-800'>
                Page <span className='italic text-yellow-500'>{pathname.slice(1)}</span> is Not Found !
            </h1>
        </div>
    );
};

export default NotFound;