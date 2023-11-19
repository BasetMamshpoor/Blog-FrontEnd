import React from 'react';

const NotFound = ({ value }) => {
    return (
        <div className='flex items-center justify-center w-full min-h-[30vh]'>
            <p className='text-3xl font-semibold font-mono'>sorry <span className='italic underline'>{value}</span> page dosen't exist.</p>
        </div>
    );
};

export default NotFound;