import React from 'react';
import styles from './NotFound.module.css'

const NotFound = ({ value }) => {
    return (
        <div className={styles.notFound}>
            <p className={styles.text}>sorry <span>{value}</span> page dosen't exist.</p>
        </div>
    );
};

export default NotFound;