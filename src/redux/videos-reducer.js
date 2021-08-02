import {youtubeAPI} from "../api/api";

const SET_VIDEOS = 'VIDEOS/SET_VIDEOS';
const SET_VIDEO_VIEWS = 'VIDEOS/SET_VIDEO_VIEWS'
const SET_VIEW_MODE = 'VIDEOS/SET_VIEW_MODE'
const SET_FAVORITE_QUERY = 'VIDEOS/ADD_FAVORITE_QUERY'
const SET_FAVORITE_QUERIES = 'VIDEOS/SET_FAVORITE_QUERIES'
const UPDATE_FAVORITE_QUERY = 'VIDEOS/UPDATE_FAVORITE_QUERY'
const REMOVE_FAVORITE_QUERY = 'VIDEOS/REMOVE_FAVORITE_QUERY'
const SET_QUERY_TEXT = 'VIDEOS/SET_QUERY_TEXT'
const SET_QUERY_TEXT_WITH_PARAMS = 'VIDEOS/SET_QUERY_TEXT_WITH_PARAMS'
const RESET_QUERY_PARAMS = 'VIDEOS/RESET_QUERY_PARAMS'
const SET_LAST_QUERY_TEXT = 'VIDEOS/SET_LAST_QUERY_TEXT'

let favoriteQueriesId = 0;

let initialState = {
    videos: [
        {
            id: null,
            title: null,
            channelTitle: null,
            thumbnail: null,
            views: 0
        }
    ],
    favoriteQueries: [],
    orderVariants: [{
        value: "date",
        title: "дате"
    }, {
        value: "rating",
        title: "рейтингу"
    }, {
        value: "relevance",
        title: "релевантности"
    }, {
        value: "viewCount",
        title: "просмотрам"
    }],
    minResults: 0,
    maxResults: 50,
    totalResults: 0,
    isLoaded: false,
    viewMode: "list",
    queryText: "",
    queryParams: {
        maxResults: 12
    },
    lastQueryText: ""
}

const videosReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VIDEOS:
            return {
                ...state,
                ...action.payload
            }
        case SET_VIDEO_VIEWS:
            return {
                ...state,
                videos: state.videos.map(v => {
                    if (v.id === action.payload.id) {
                        return {
                            ...v,
                            views: action.payload.views
                        }
                    }
                    return v;
                })
            }
        case SET_VIEW_MODE:
            return {
                ...state,
                viewMode: action.payload
            }
        case SET_FAVORITE_QUERY:
            return {
                ...state,
                favoriteQueries: [...state.favoriteQueries, action.payload]
            }
        case SET_FAVORITE_QUERIES:
            return {
                ...state,
                favoriteQueries: action.payload
            }
        case UPDATE_FAVORITE_QUERY:
            return {
                ...state,
                favoriteQueries: state.favoriteQueries.map(query => {
                    if (query.id === action.payload.id) {
                        return {
                            id: action.payload.id,
                            ...action.payload.query
                        }
                    }
                    return query;
                })
            }
        case REMOVE_FAVORITE_QUERY:
            return {
                ...state,
                favoriteQueries: state.favoriteQueries.filter(query =>
                    query.id !== action.payload.id
                )
            }
        case SET_QUERY_TEXT:
            return {
                ...state,
                queryText: action.payload
            }
        case SET_QUERY_TEXT_WITH_PARAMS: {
            return {
                ...state,
                queryText: action.payload.queryText,
                queryParams: action.payload.queryParams
            }
        }
        case RESET_QUERY_PARAMS: {
            return {
                ...state,
                queryParams: {
                    maxResults: 12
                }
            }
        }
        case SET_LAST_QUERY_TEXT: {
            return {
                ...state,
                lastQueryText: action.payload
            }
        }
        default:
            return state;
    }
}

export const setVideos = (videos, totalResults, isLoaded) => ({
    type: SET_VIDEOS,
    payload: {videos, totalResults, isLoaded}
});
export const setVideoViews = (id, views) => ({type: SET_VIDEO_VIEWS, payload: {id, views}});
export const setViewMode = (viewMode) => ({type: SET_VIEW_MODE, payload: viewMode});
export const setFavoriteQuery = (query) => ({type: SET_FAVORITE_QUERY, payload: query});
export const setFavoriteQueries = (queries) => ({type: SET_FAVORITE_QUERIES, payload: queries});
export const updateFavoriteQueryAC = (id, query) => ({type: UPDATE_FAVORITE_QUERY, payload: {id, query}});
export const removeFavoriteQueryAC = (id) => ({type: REMOVE_FAVORITE_QUERY, payload: {id}});
export const setQueryText = (queryText) => ({type: SET_QUERY_TEXT, payload: queryText});
export const setLastQueryText = (lastQueryText) => ({type: SET_LAST_QUERY_TEXT, payload: lastQueryText});
export const setQueryTextWithParams = (queryText, queryParams) => ({
    type: SET_QUERY_TEXT_WITH_PARAMS,
    payload: {queryText, queryParams}
});
export const resetQueryParams = () => ({type: RESET_QUERY_PARAMS})

export const getVideos = (queryText, queryParams) => async (dispatch) => {
    let response = await youtubeAPI.search(queryText, queryParams);
    let videos = response.items.map((video, key) => ({
        id: video.id.videoId,
        title: video.snippet.title,
        channelTitle: video.snippet.channelTitle,
        thumbnail: video.snippet.thumbnails.medium.url
    }))
    let totalResults = response.pageInfo.totalResults;
    //Ждать просмотры (не получается дождаться)
    Promise.all([
        ...videos.map(video => dispatch(getVideoViews(video.id))),
        dispatch(resetQueryParams()),
        dispatch(setLastQueryText(queryText))
    ]).then(
        dispatch(setVideos(videos, totalResults, true))
    )
}

export const getVideoViews = (id) => async (dispatch) => {
    let response = await youtubeAPI.getVideo(id);
    let views = response.items[0].statistics.viewCount;
    dispatch(setVideoViews(id, views));
}

export const changeViewMode = (viewMode) => (dispatch) => {//убрать
    dispatch(setViewMode(viewMode));
}

export const makeQuery = (queryText, queryParams) => (dispatch) => {
    dispatch(setQueryTextWithParams(queryText, queryParams));
    dispatch(getVideos(queryText, queryParams));
}

export const addFavoriteQuery = (query) => (dispatch, getState) => {
    dispatch(setFavoriteQuery({id: favoriteQueriesId, ...query}));
    favoriteQueriesId++;
    const favoriteQueries = getState().videos.favoriteQueries;
    window.localStorage.setItem("favoriteQueries", JSON.stringify(favoriteQueries));
}

export const updateFavoriteQuery = (queryId, query) => (dispatch, getState) => {
    dispatch(updateFavoriteQueryAC(queryId, query));
    const favoriteQueries = getState().videos.favoriteQueries;
    window.localStorage.setItem("favoriteQueries", JSON.stringify(favoriteQueries));
}

export const removeFavoriteQuery = (queryId) => (dispatch, getState) => {
    dispatch(removeFavoriteQueryAC(queryId));
    const favoriteQueries = getState().videos.favoriteQueries;
    window.localStorage.setItem("favoriteQueries", JSON.stringify(favoriteQueries));
}

export const getFavoriteQueries = () => (dispatch) => {
    let queries = JSON.parse(window.localStorage.getItem("favoriteQueries"));
    if(queries){
        dispatch(setFavoriteQueries(queries));
    }
}

export default videosReducer;