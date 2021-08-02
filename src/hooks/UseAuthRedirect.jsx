import {Redirect} from "react-router";

function useAuthRedirect(isAuth) {
    if (!isAuth){
        return <Redirect to="/login"/>
    }
}

export default useAuthRedirect;