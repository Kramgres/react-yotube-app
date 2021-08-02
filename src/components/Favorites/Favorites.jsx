import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './Favorites.module.scss';
import {Button} from "antd";
import {makeQuery, removeFavoriteQuery} from "../../redux/videos-reducer";
import {Redirect, useHistory} from "react-router";
import EditFavoriteQuery from "../SearchVideo/EditFavoriteQuery/EditFavoriteQuery";

const Favorites = React.memo(() => {
    const isAuth = useSelector((state => state.auth.isAuth));
    const favoriteQueries = useSelector((state => state.videos.favoriteQueries))
    const [visibleModal, setVisibleModal] = useState(false)
    const [queryText, setQueryText] = useState("");
    const [queryParams, setQueryParams] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();

    const onMakeClick = (queryText, queryParams) => {
        dispatch(makeQuery(queryText, queryParams));
        history.push('/');
    }

    const onEditClick = (queryText, queryParams) => {
        setQueryText(queryText);
        setQueryParams(queryParams);
        setVisibleModal(true);
    }

    const onRemoveClick = (queryId) => {
        dispatch(removeFavoriteQuery(queryId))
    }

    if(!isAuth){
        return <Redirect to="/login"/>
    }

    return (
        <>
            <div className={styles.favorites}>
                <div className="container">
                    <div className={styles.favorites__wrapper}>
                        <h1 className={styles.title}>Избранное</h1>
                        {favoriteQueries.length > 0 ?
                            <ul className={styles.favoritesList}>
                                {favoriteQueries.map((query, key) => (
                                    <li key={key} className={styles.favoritesItem}>
                                        <div className={styles.favoritesItem__title}>{query.title}</div>
                                        <div className={styles.favoritesItem__actions}>
                                            <Button onClick={() => onMakeClick(query.q, {title: query.title, order: query.order, maxResults: query.maxResults})} type="link">Выполнить</Button>
                                            <Button onClick={() => onEditClick(query.q, {id: query.id, title: query.title, order: query.order, maxResults: query.maxResults})} type="link">Изменить</Button>
                                            <Button onClick={() => onRemoveClick(query.id)} type="link" danger>Удалить</Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>:
                            <div className={styles.notFound}>Нет сохраненных запросов</div>
                        }
                    </div>
                </div>
            </div>
            {visibleModal && <EditFavoriteQuery visibleModal={visibleModal} setVisibleModal={setVisibleModal} queryText={queryText} queryParams={queryParams} editMode={true}/>}
        </>
    );
})

export default Favorites;