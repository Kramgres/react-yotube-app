import authReducer from "./auth-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import appReducer from "./app-reducer";
import videosReducer from "./videos-reducer";

let reducers = {
    app: appReducer,
    auth: authReducer,
    videos: videosReducer
}

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

export default store;