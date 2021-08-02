import React from 'react';
import styles from './VideosGridItem.module.scss';

function VideosGridItem({title, channelTitle, thumbnail, views}) {
    return (
        <div className={styles.preview}>
            <div className={styles.img}>
                <img src={thumbnail} alt="preview"/>
            </div>
            <div className={styles.title}>{title}</div>
            <div className={styles.channel}>{channelTitle}</div>
            <div className={styles.views}>{views} просмотров</div>
        </div>
    );
}

export default VideosGridItem;