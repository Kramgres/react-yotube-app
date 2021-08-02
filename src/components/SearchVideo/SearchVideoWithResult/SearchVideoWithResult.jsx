import React, {useState} from 'react';
import styles from "./SearchVideoWithResult.module.scss";
import Search from "antd/lib/input/Search";
import { HeartOutlined } from '@ant-design/icons';
import {useSelector} from "react-redux";
import VideosGrid from "../VideosGrid/VideosGrid";
import VideosList from "../VideosList/VideosList";
import FilterPanel from "../FilterPanel/FilterPanel";
import EditFavoriteQuery from "../EditFavoriteQuery/EditFavoriteQuery";

function SearchVideoWithResult({onSearch, queryText, lastQueryText, onInput}) {
    const totalResults = useSelector((state => state.videos.totalResults))
    const videos = useSelector((state => state.videos.videos))
    const viewMode = useSelector((state => state.videos.viewMode))
    const [visibleModal, setVisibleModal] = useState(false)

    const onFavoriteIconClick = () => {
        setVisibleModal(true);
    }

    const suffix = (
        <HeartOutlined onClick={onFavoriteIconClick}
                       style={{
                           fontSize: 20,
                           color: '#1890ff',
                       }}
        />
    );

    return (
        <>
            <div className={styles.search}>
                <div className="container">
                    <div className={styles.search__wrapper}>
                        <h1 className={styles.title}>Поиск видео</h1>
                        <Search
                            className={styles.input}
                            placeholder="Что хотите посмотреть?"
                            suffix={suffix}
                            enterButton="Найти"
                            size="large"
                            value={queryText}
                            onInput={onInput}
                            onSearch={onSearch}/>

                        <div className={styles.filterPanel}>
                            <FilterPanel lastQueryText={lastQueryText}
                                         totalResults={totalResults}
                                         viewMode={viewMode}/>
                        </div>
                        {
                            (viewMode === 'grid') && <VideosGrid videos={videos}/>
                        }
                        {
                            (viewMode === 'list') && <VideosList videos={videos}/>
                        }
                    </div>
                </div>
            </div>
            {visibleModal && <EditFavoriteQuery visibleModal={visibleModal} setVisibleModal={setVisibleModal} queryText={queryText} editMode={false}/>}
        </>

    );
}

export default SearchVideoWithResult;