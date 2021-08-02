import {setAuthUserData} from "./auth-reducer";
import {getFavoriteQueries} from "./videos-reducer";

const INITIALIZED_SUCCESS = 'APP/INITIALIZED_SUCCESS'

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type){
        case INITIALIZED_SUCCESS:
            return {...state, initialized: true}
        default:
            return state;
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initApp = () => (dispatch) => {
    let userToken =  window.localStorage.getItem("authToken");
    if (userToken){
        dispatch(setAuthUserData(true));
        dispatch(getFavoriteQueries());
    }
    dispatch(initializedSuccess());
}

export default appReducer;