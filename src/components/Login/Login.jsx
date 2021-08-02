import React from 'react';
import styles from './Login.module.scss';
import logo from '../../img/sibdev-logo.svg'
import {Button, Form, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router";

function Login() {
    let dispatch = useDispatch();
    let isAuth = useSelector((state => state.auth.isAuth))

    const onFinish = (values) => {
        dispatch(login(values.login, values.password));
    };

    if (isAuth) {
        return <Redirect to="/"/>
    }

    return (
        <div className={styles.login}>
            <div className={styles.login__wrapper}>
                <div className={styles.logo}>
                    <img src={logo} alt="Logo"/>
                </div>
                <h1 className={styles.title}>Вход</h1>
                <Form
                    onFinish={onFinish}
                    layout="vertical">
                    <Form.Item
                        name="login"
                        label="Введите логин"
                        rules={[{required: true, message: 'Введите логин'}]}>
                        <Input placeholder="Логин"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Введите пароль"
                        rules={[{required: true, message: 'Введите пароль'}]}>
                        <Input.Password placeholder="Пароль"/>
                    </Form.Item>
                    <Form.Item>
                        <div className={styles.buttonWrapper}>
                            <Button type="primary" htmlType="submit" className={styles.button}>Войти</Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;