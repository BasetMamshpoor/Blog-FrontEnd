import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import userlogo from '../../images/Ei-user.svg'
import Loading from '../../images/200.gif'
import { toast, ToastContainer } from 'react-toastify';
import Token from '../../Functions/Token';
import useAxios from '../../Hooks/useAxios'
import Cookies from 'js-cookie';
import style from './UpdateProfile.module.css'
import validation from '../../lib/validationUpdateProfile'

const UpdateProfile = () => {
    const { user: token } = Token()
    const { state } = useLocation();
    const navigate = useNavigate();
    const imgPreview = useRef();
    const [userInfo, setUserInfo] = useState({})
    const [loading, setLoading] = useState(true)
    const [imagePath, setImagePath] = useState()

    const axios = useAxios()
    const errors = validation(userInfo)


    useEffect(() => {
        if (token === null)
            navigate('/login');
    }, [navigate, token])

    useEffect(() => {
        if (state) {
            const { username, first_name, last_name, email, profile_photo } = state;
            setUserInfo({ username, first_name, last_name, email });
            setImagePath(profile_photo);
            setLoading(false)
        } else if (token) {
            const findUser = async () => {
                await axios.get(`accounts/users/${token.username}`)
                    .then(({ data }) => {
                        setUserInfo(() => {
                            const { profile_photo, ...newUser } = data
                            return newUser;
                        })
                        setImagePath(data.profile_photo);
                        setLoading(false)
                    }).catch(() => toast.error('sorry, something went wrong!'))
            }
            findUser();
        }
    }, [state])

    const handleChange = event => {
        setUserInfo(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }
    const handleSubmit = async e => {
        e.preventDefault();
        await axios.put(`accounts/users/${token.username}/`, userInfo, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(({ data }) => {
            if (data.username !== token.username) {
                Cookies.remove('authTokens')
                navigate('/explore')
            } else navigate(`/user/${token.username}`)
        }).catch(err => {
            toast.error(Object.values(err.response.data)[0][0])
        })
    }
    function handleProfile(e) {
        const image = e.target.files[0];
        if (image) {
            setUserInfo(prev => {
                const { remove_profile_photo, ...data } = prev
                return { ...data, profile_photo: image }
            })
            const fileReader = new FileReader();
            fileReader.readAsDataURL(image);
            fileReader.addEventListener("load", function () {
                imgPreview.current.src = this.result
            });
        }
    }

    return (
        <>
            <div className="mt-3">
                <div className="container">
                    {loading ? <div className='flex items-center justify-center'><div><img src={Loading} alt="" className='my-0 mx-auto' /></div></div> :
                        <div className='flex items-center justify-center mb-12'>
                            <form className='w-full bg-white px-8 pt-8 pb-4 max-w-md shadow-sm rounded-10 text-xs border' onSubmit={handleSubmit}>
                                <h2 className='tracking-wider mb-0 p-3 text-center text-3xl text-gray-600 border-b'>Update Profile</h2>
                                <div className={style.mWmubF}>
                                    <input onChange={handleProfile} type="file" name="profile_photo" id="prof_img" accept='image/jpeg, image/jpg, image/png, image/webp' hidden />
                                    <div className={style.qziomy}>
                                        <input type="checkbox" id={style.QzoliOption} hidden />
                                        <label htmlFor={style.QzoliOption} className="cursor-pointer absolute left-0 top-4 z-20">
                                            <svg className='w-6 h-6' viewBox="0 0 16 16">
                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                            </svg>
                                        </label>
                                        <ul className={`${style.modalOption} hidden flex-col absolute left-6 z-10 top-4 border bg-white rounded-md`}>
                                            <li className='text-xs cursor-pointer transition-cus hover:bg-gray-200' onClick={() => setUserInfo(prev => {
                                                setImagePath(null)
                                                const { profile_photo, ...data } = prev
                                                return { ...data, remove_profile_photo: true }
                                            })}><label className='block w-full cursor-pointer py-2 px-1'>Remove Image</label></li>
                                            <li className='text-xs cursor-pointer transition-cus hover:bg-gray-200 '><label className='block w-full cursor-pointer py-2 px-1' htmlFor="prof_img">Change Image</label></li>
                                        </ul>
                                    </div>
                                    <div className="flex items-center justify-center overflow-hidden relative py-4 px-0">
                                        <div className='w-[155px] h-[150px] rounded-full overflow-hidden border'>
                                            <img ref={imgPreview} src={imagePath || userInfo.profile_photo || userlogo} />
                                            <div className="px-1 bg-white rounded-full w-9 h-8 absolute bottom-3 lef-[45%] z-10 ">
                                                <svg className='w-full h-full' viewBox="0 0 16 16" fill='rgb(50, 50, 50)'>
                                                    <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                                                    <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={style.mWmubF}>
                                    <label htmlFor="username" className={style.floatLabel}>User Name</label>
                                    <input id="username" name="username" type="text" onChange={handleChange} value={userInfo.username} />
                                    {errors.username && <span>{errors.username}</span>}
                                </div>
                                <div className={style.mWmubF}>
                                    <label htmlFor="firstname" className={style.floatLabel}>First Name</label>
                                    <input id="firstname" name="first_name" type="text" onChange={handleChange} value={userInfo.first_name} />
                                </div>
                                <div className={style.mWmubF}>
                                    <label htmlFor="lastname" className={style.floatLabel}>Last Name</label>
                                    <input id="lastname" name="last_name" type="text" onChange={handleChange} value={userInfo.last_name} />
                                </div>
                                <div className={style.mWmubF}>
                                    <label htmlFor="Email" className={style.floatLabel}>Email</label>
                                    <input id="Email" name="email" type="text" onChange={handleChange} value={userInfo.email} />
                                    {errors.email && <span>{errors.email}</span>}
                                </div>
                                <div className={style.mWmubF}>
                                    <button type="submit" className='w-full bg-purple-600 shadow-sm rounded-10 border-none text-white uppercase cursor-pointer block text-lg tracking-wider outline-0 py-4 transition-cus hover:bg-purple-700'>Change Profile !</button>
                                </div>
                            </form>
                        </div>
                    }
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default UpdateProfile;