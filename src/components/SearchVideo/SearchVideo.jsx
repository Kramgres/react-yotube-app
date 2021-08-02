import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getVideos, setQueryText} from "../../redux/videos-reducer";
import SearchVideoWithResult from "./SearchVideoWithResult/SearchVideoWithResult";
import SearchVideoWithoutResult from "./SearchVideoWithoutResult/SearchVideoWithoutResult";
import {Redirect} from "react-router";

function SearchVideo() {
    const isAuth = useSelector((state => state.auth.isAuth));
    const isLoaded = useSelector((state => state.videos.isLoaded));
    const queryText = useSelector((state => state.videos.queryText));
    const lastQueryText = useSelector((state => state.videos.lastQueryText));
    const queryParams = useSelector(state => state.videos.queryParams);
    const dispatch = useDispatch();

    const onInput = (e) => {
        dispatch(setQueryText(e.target.value))
    }

    const onSearch = (queryText) => {
        dispatch(getVideos(queryText, queryParams));
    }

    if(!isAuth){
        return <Redirect to="/login"/>
    }

    if (isLoaded) {
        return <SearchVideoWithResult onSearch={onSearch} queryText={queryText} lastQueryText={lastQueryText} onInput={onInput}/>
    }

    return <SearchVideoWithoutResult onSearch={onSearch} queryText={queryText} onInput={onInput}/>;
}

export default SearchVideo;