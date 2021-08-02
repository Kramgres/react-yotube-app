import React from 'react';
import styles from './Header.module.scss';
import logo from '../../img/sibdev-logo.svg';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/auth-reducer";

function Header() {

    let isAuth = useSelector((state => state.auth.isAuth));
    let dispatch = useDispatch();

    return (
        <div className={styles.header}>
            <div className="container">
                <div className={styles.header__wrapper}>
                    <div className={styles.logo}>
                        <img src={logo} alt="Logo"/>
                    </div>
                    <nav className={styles.menu}>
                        <NavLink to='/' exact  className={styles.menu__item}
                                 activeClassName={styles.menu__item_active}>Поиск</NavLink>
                        <NavLink to='/favorites'  className={styles.menu__item}
                                 activeClassName={styles.menu__item_active}>Избранное</NavLink>
                    </nav>
                    {isAuth && <button className={styles.logout} onClick={() => dispatch(logout())}>Выйти</button>}
                </div>
            </div>
        </div>
    );
}

export default Header;