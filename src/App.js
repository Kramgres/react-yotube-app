import './scss/main.scss';
import {Route, Switch, useLocation} from "react-router";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {initApp} from "./redux/app-reducer";
import SearchVideo from "./components/SearchVideo/SearchVideo";
import Favorites from "./components/Favorites/Favorites";
import Preloader from "./components/common/Preloader/Preloader";

function App() {
    let location = useLocation();
    let dispatch = useDispatch();
    let initialized = useSelector((state => state.app.initialized));

    useEffect(() => {
        dispatch(initApp());
    }, [dispatch])

    if(!initialized){
        return <Preloader/>
    }

    return (
        <div className="App">
            {location.pathname !== '/login' && <Header/>}
            <main className={"main " + (location.pathname !== '/login' ? "mainWithHeader" : "")}>
                <Switch>
                    <Route path='/' exact render={() => <SearchVideo/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route path='/favorites' render={() => <Favorites/>}/>
                </Switch>
            </main>
        </div>
    );
}

export default App;
