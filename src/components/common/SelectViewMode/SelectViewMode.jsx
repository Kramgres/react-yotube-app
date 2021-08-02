import React from 'react';
import styles from './SelectViewMode.module.scss';
import {useDispatch} from "react-redux";

function SelectViewMode({currentViewMode, setViewMode}) {

    let dispatch = useDispatch();

    const onListClick = () =>{
        dispatch(setViewMode('list'));
    }

    const onGridClick = () =>{
        dispatch(setViewMode('grid'));
    }

    return (
        <div className={styles.viewMode}>
            <button onClick={onListClick} className={styles.variant + ' ' + styles.list + ' ' + (currentViewMode === 'list' ? styles.variant_active : '')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 6H21" stroke="#272727" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 12H21" stroke="#272727" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <path d="M8 18H21" stroke="#272727" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <path d="M3 6H3.01" stroke="#272727" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <path d="M3 12H3.01" stroke="#272727" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <path d="M3 18H3.01" stroke="#272727" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>
            </button>
            <button onClick={onGridClick} className={styles.variant + ' ' + styles.grid + ' ' + (currentViewMode === 'grid' ? styles.variant_active : '')}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 5H5V10H10V5Z" stroke="#272727" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <path d="M19 5H14V10H19V5Z" stroke="#272727" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <path d="M19 14H14V19H19V14Z" stroke="#272727" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                    <path d="M10 14H5V19H10V14Z" stroke="#272727" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    );
}

export default SelectViewMode;