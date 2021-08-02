import React from 'react';
import styles from "./VideosGrid.module.scss";
import VideosGridItem from "./VideoGridItem/VideosGridItem";

function VideosGrid({videos}) {
    return (
        <div className={styles.videosGrid}>
            {videos.map(video => (<VideosGridItem key={video.id}
                                                  title={video.title}
                                                  channelTitle={video.channelTitle}
                                                  views={video.views}
                                                  thumbnail={video.thumbnail}/>))}
        </div>
    );
}

export default VideosGrid;