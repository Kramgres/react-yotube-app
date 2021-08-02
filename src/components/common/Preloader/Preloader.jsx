import React from 'react';
import styles from './Preloader.module.scss';
import {Spin} from "antd";

function Preloader(props) {
    return (
        <div className="container">
            <div className={styles.preloader}>
                <Spin size="large" />
            </div>
        </div>
    );
}

export default Preloader;