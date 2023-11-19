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
                <div className='my-0 mx-8 xs:m-4 rounded-10 p-6 bg-[#ffffff61] flex flex-col w-[500px]'>
                    <h4 className='text-center font-medium text-2xl xs:text-3xl text-white mb-7'>Sign Up</h4>
                    <form className='flex flex-wrap items-center justify-between'>
                        <div className={`${styles.formInput} relative flex flex-col pb-8 xs:pb-10 w-full`}>
                            <Input placeholder=' ' className={styles.input} type="text" name="username" id='username' result={handleChange} value={userInfo.username} />
                            <label htmlFor="username">* User Name :</label>
                            {touch.username && errors.username && <span className={styles.error}>{errors.username}</span>}
                        </div>
                        <div className={`${styles.formInput} relative flex flex-col pb-10 w-full`}>
                            <Input placeholder=' ' className={styles.input} type='password' name='password' id='password' result={handleChange} value={userInfo.password} />
                            <img onClick={handleShowHide} className={styles.imgPass} src={closeEye} alt="show-hide" />
                            <label htmlFor="password">* Password :</label>
                            {touch.password && errors.password && <span className={styles.error}>{errors.password}</span>}
                        </div>
                        <div className={`${styles.formInput} relative flex flex-col pb-10 w-full`}>
                            <Input placeholder=' ' className={styles.input} type='password' name='confirm_password' id='confirm_password' result={handleChange} value={userInfo.confirm_password} />
                            <img onClick={handleShowHide} className={styles.imgPass} src={closeEye} alt="Cshow-hide" />
                            <label htmlFor="confirm_password">* Confirm Password :</label>
                            {touch.confirm_password && errors.confirm_password && <span className={styles.error}>{errors.confirm_password}</span>}
                        </div>
                        <div className={`${styles.formInput} relative flex flex-col pb-10 w-[48%]`}>
                            <Input placeholder=' ' className={styles.input} type="text" name='first_name' id='firstname' result={handleChange} value={userInfo.first_name} />
                            <label htmlFor="firstname">First Name :</label>
                        </div>
                        <div className={`${styles.formInput} relative flex flex-col pb-10 w-[48%]`}>
                            <Input placeholder=' ' className={styles.input} type="text" name='last_name' id='lastname' result={handleChange} value={userInfo.last_name} />
                            <label htmlFor="lastname">Last Name :</label>
                        </div>
                        <div className={`${styles.formInput} relative flex flex-col pb-4 xs:pb-8 w-full`}>
                            <Input placeholder=' ' className={styles.input} type="email" name='email' id='email' result={handleChange} value={userInfo.email} />
                            <label htmlFor="email">Email :</label>
                            {touch.email && errors.email && <span className={styles.error}>{errors.email}</span>}
                        </div>
                        <div className='w-full font-semibold px-1 pb-4 text-[#1d9577] flex relative'>
                            <input hidden accept='image/jpeg, image/jpg, image/png, image/webp' type="file" name='file' id='file' onChange={({ target }) => setUserInfo(prev => { return { ...prev, profile_photo: target.files[0] } })} />
                            <label htmlFor="file" className={styles.custom_file_input}>* Profile Image :</label>
                        </div>
                        <button className='w-full xs:text-2xl bg-[#1d9577] border-none px-0 py-2 rounded-10 text-white cursor-pointer transition-cus my-2 mx-0 hover:text-green-400' type="button" onClick={handleSubmit}>Sign Up</button>
                        <Link to='/login' className={styles.link}>Already Have Account ?</Link>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default SignUp;


