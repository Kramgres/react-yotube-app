import React from 'react';
import styles from './VideosList.module.scss';
import VideosListItem from "./VideosListItem/VideosListItem";

const VideosList = React.memo(({videos}) => {
    return (
        <div className={styles.videosList}>
            {videos.map(video => (<VideosListItem key={video.id}
                                                  title={video.title}
                                                  channelTitle={video.channelTitle}
                                                  views={video.views}
                                                  thumbnail={video.thumbnail}/>))}
        </div>
    );
})

export default VideosList;