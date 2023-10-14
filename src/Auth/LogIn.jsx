import React, { useState, useEffect } from 'react';
import openEye from './images/openEye.svg'
import closeEye from './images/closeEye.svg'
import styles from './Style.module.css'
import { postUser } from './PostData';
import { ToastContainer } from 'react-toastify';
import notify from './toast'
import error from './error'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../Components/Input';
import Token from '../Functions/Token'
import Cookies from 'js-cookie';
const LogIn = () => {
    const navigate = useNavigate()
    const { user: token } = Token()
    const [userInfo, setUserInfo] = useState({ username: '', password: '' })
    const [touch, setTouch] = useState({})
    const errors = error(userInfo, 'login');

    useEffect(() => {
        if (token) navigate('/')
    }, [])

    const handleShowHide = event => {
        let { target } = event

        if (target.previousSibling.type === 'password') {
            target.previousSibling.type = 'text'
            target.src = openEye
        }
        else {
            target.previousSibling.type = 'password'
            target.src = closeEye
        }
    }
    const handleChange = (name, value) => {
        setUserInfo(prev => {
            return {
                ...prev,
                [name]: value.replace(/ /g, '')
            }
        })
    }
    const handleSubmit = async event => {
        event.preventDefault();
        if (Object.keys(errors).length) {
            setTouch({ username: true, password: true })
            return
        } else {
            await postUser(userInfo)
                .then(res => {
                    Cookies.set('authTokens', JSON.stringify(res.data), { expires: 365 })
                    notify('success', 'Log In Successfully.')
                    setTimeout(() => {
                        navigate('/')
                    }, 1000);
                }).catch(() => notify('error', 'username or password is wrong.'))
        }
    }

    return (
        <>
            {
                <div className={styles.main}>
                    <div className={styles.formSignIn}>
                        <h4>Log In</h4>
                        <form className={styles.form} method='POST'>
                            <div className={styles.formInput}>
                                <Input placeholder=' ' className={styles.input} type="text" name="username" id='username' result={handleChange} value={userInfo.username} />
                                <label htmlFor="username">User Name :</label>
                                {touch.username && errors.username && <span className={styles.error}>{errors.username}</span>}
                            </div>
                            <div className={styles.formInput}>
                                <Input placeholder=' ' className={styles.input} type='password' name='password' id='password' result={handleChange} value={userInfo.password} />
                                <img onClick={handleShowHide} className={styles.imgPass} src={closeEye} alt="show-hide" />
                                <label htmlFor="password">Password :</label>
                                {touch.password && errors.password && <span className={styles.error}>{errors.password}</span>}
                            </div>
                            <button className={styles.btn} type="button" onClick={handleSubmit}>Log In</button>
                            <Link to='/signup' className={styles.link}>You Don't Have Account ?</Link>
                            <Link to='/explore' className={styles.link}>Explore</Link>
                        </form>
                    </div>
                    <ToastContainer />
                </div>
            }
        </>
    );
};

export default LogIn;