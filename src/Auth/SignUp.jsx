import React, { useState } from 'react';
import { postNewUser } from './PostData';
import styles from './Style.module.css'
import openEye from './images/openEye.svg'
import closeEye from './images/closeEye.svg'
import error from './error';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notify from './toast'
import Input from '../Components/Input'


const SignUp = () => {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState({
        username: '', first_name: '', last_name: '', email: '', password: '', confirm_password: '', profile_photo: null,
    })
    const [touch, setTouch] = useState({})
    const errors = error(userInfo, 'signup')

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
        if (name === 'first_name' || name === 'last_name') {
            setUserInfo(prev => {
                return {
                    ...prev,
                    [name]: value
                }
            })
        } else {
            setUserInfo(prev => {
                return {
                    ...prev,
                    [name]: value.replace(/ /g, '')
                }
            })
        }
    }

    const handleSubmit = async event => {
        event.preventDefault();
        if (Object.keys(errors).length) {
            setTouch({ username: true, password: true, confirm_password: true, email: true })
            return
        } else {
            await postNewUser(userInfo)
                .then(() => {
                    notify('success', 'Sign In Successfully.')
                    setTimeout(() => {
                        navigate('/login')
                    }, 1000);
                }).catch(err => notify('error', err.response.data.username[0]))
        }
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.formSignIn}>
                    <h4>Sign Up</h4>
                    <form className={styles.form}>
                        <div className={styles.formInput}>
                            <Input placeholder=' ' className={styles.input} type="text" name="username" id='username' result={handleChange} value={userInfo.username} />
                            <label htmlFor="username">* User Name :</label>
                            {touch.username && errors.username && <span className={styles.error}>{errors.username}</span>}
                        </div>
                        <div className={styles.formInput}>
                            <Input placeholder=' ' className={styles.input} type='password' name='password' id='password' result={handleChange} value={userInfo.password} />
                            <img onClick={handleShowHide} className={styles.imgPass} src={closeEye} alt="show-hide" />
                            <label htmlFor="password">* Password :</label>
                            {touch.password && errors.password && <span className={styles.error}>{errors.password}</span>}
                        </div>
                        <div className={styles.formInput}>
                            <Input placeholder=' ' className={styles.input} type='password' name='confirm_password' id='confirm_password' result={handleChange} value={userInfo.confirm_password} />
                            <img onClick={handleShowHide} className={styles.imgPass} src={closeEye} alt="Cshow-hide" />
                            <label htmlFor="confirm_password">* Confirm Password :</label>
                            {touch.confirm_password && errors.confirm_password && <span className={styles.error}>{errors.confirm_password}</span>}
                        </div>
                        <div className={styles.formInput}>
                            <Input placeholder=' ' className={styles.input} type="text" name='first_name' id='firstname' result={handleChange} value={userInfo.first_name} />
                            <label htmlFor="firstname">First Name :</label>
                        </div>
                        <div className={styles.formInput}>
                            <Input placeholder=' ' className={styles.input} type="text" name='last_name' id='lastname' result={handleChange} value={userInfo.last_name} />
                            <label htmlFor="lastname">Last Name :</label>
                        </div>
                        <div className={styles.formInput}>
                            <Input placeholder=' ' className={styles.input} type="email" name='email' id='email' result={handleChange} value={userInfo.email} />
                            <label htmlFor="email">Email :</label>
                            {touch.email && errors.email && <span className={styles.error}>{errors.email}</span>}
                        </div>
                        <div className={styles.formInputaFile}>
                            <input hidden accept='image/jpeg, image/jpg, image/png, image/webp' type="file" name='file' id='file' onChange={({ target }) => setUserInfo(prev => { return { ...prev, profile_photo: target.files[0] } })} />
                            <label htmlFor="file" className={styles.custom_file_input}>* Profile Image :</label>
                        </div>
                        <button className={styles.btn} type="button" onClick={handleSubmit}>Sign Up</button>
                        <Link to='/login' className={styles.link}>Already Have Account ?</Link>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default SignUp;


