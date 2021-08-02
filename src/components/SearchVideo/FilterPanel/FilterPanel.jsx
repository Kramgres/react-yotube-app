import React from 'react';
import styles from "./FilterPanel.module.scss";
import SelectViewMode from "../../common/SelectViewMode/SelectViewMode";
import {changeViewMode} from "../../../redux/videos-reducer";

function FilterPanel({lastQueryText, totalResults, viewMode}) {
    return (
        <div className={styles.panel}>
            <div className={styles.videosCount}>
                Видео по запросу <b className={styles.videosCount__query}>«{lastQueryText}»</b>
                <span className={styles.videosCount__count}>{totalResults}</span>
            </div>
            <SelectViewMode currentViewMode={viewMode} setViewMode={changeViewMode}/>
        </div>
    );
}

export default FilterPanel;