import {authAPI} from "../api/api";

const SET_AUTH_USER_DATA = 'AUTH/SET_USER_DATA'

let initialState = {
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type){
        case SET_AUTH_USER_DATA:
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export const setAuthUserData = (isAuth) => ({type: SET_AUTH_USER_DATA, payload: {isAuth}})

export const login = (login, password) => async (dispatch) => {
    const response = await authAPI.getUsers();
    let user = response.find(u => u.login === login && u.password === password);
    if (user){
        window.localStorage.setItem("authToken", "token");
        dispatch(setAuthUserData(true));
    }
}

export const logout = () => (dispatch) => {
    window.localStorage.removeItem("authToken");
    dispatch(setAuthUserData(false));
}

export default authReducer;