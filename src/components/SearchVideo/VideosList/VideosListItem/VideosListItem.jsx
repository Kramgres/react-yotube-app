import React from 'react';
import styles from './VideosListItem.module.scss';

function VideosListItem({title, channelTitle, thumbnail, views}) {
    console.log(views)
    return (
        <div className={styles.preview}>
            <div className={styles.img}>
                <img src={thumbnail} alt="preview"/>
            </div>
            <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                <div className={styles.channel}>{channelTitle}</div>
                <div className={styles.views}>{views} просмотров</div>
            </div>
        </div>
    );
}

export default VideosListItem;