import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './NotFound.module.css'

const NotFound = () => {
    const { pathname } = useLocation();

    return (
        <div className={styles.notFound}>
            <h1 className={styles.text}>
                Page <span>{pathname.slice(1)}</span> is Not Found !
            </h1>
        </div>
    );
};

export default NotFound;