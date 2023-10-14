import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import userlogo from '../../images/Ei-user.svg'
import Loading from '../../images/200.gif'
import { toast, ToastContainer } from 'react-toastify';
import Token from '../../Functions/Token';
import useAxios from '../../Hooks/useAxios'
import Cookies from 'js-cookie';
import './updateprofile.css'

const UpdateProfile = () => {
    const { user: token } = Token()
    const { state } = useLocation();
    const navigate = useNavigate();
    const imgPreview = useRef();
    const [userInfo, setUserInfo] = useState()
    const [loading, setLoading] = useState(true)
    const [imagePath, setImagePath] = useState()

    const axios = useAxios()


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
            console.log(err);
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
            <div className="Jcrxu mt-3">
                <div className="container">
                    {loading ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div><img src={Loading} alt="" className='loader' /></div></div> :
                        <div className="Fcpol">
                            <form className='update_form' onSubmit={handleSubmit}>
                                <h2>Update Profile</h2>
                                <div className='mWmubF pb-1'>
                                    <input onChange={handleProfile} type="file" name="profile_photo" id="prof_img" accept='image/jpeg, image/jpg, image/png, image/webp' hidden />
                                    <div className="qziomy">
                                        <input type="checkbox" id="QzoliOption" hidden />
                                        <label htmlFor='QzoliOption' className="QzoliOption">
                                            <svg viewBox="0 0 16 16">
                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                            </svg>
                                        </label>
                                        <ul className='modalOption'>
                                            <li onClick={() => setUserInfo(prev => {
                                                setImagePath(null)
                                                const { profile_photo, ...data } = prev
                                                return { ...data, remove_profile_photo: true }
                                            })}><label>Remove Image</label></li>
                                            <li><label htmlFor="prof_img">Change Image</label></li>
                                        </ul>
                                    </div>
                                    <div className="fVrxi9">
                                        <div className='Hbrcyls'>
                                            <img ref={imgPreview} src={imagePath || userInfo.profile_photo || userlogo} />
                                            <div className="scfEsvg">
                                                <svg viewBox="0 0 16 16" fill='rgb(50, 50, 50)'>
                                                    <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                                                    <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='mWmubF'>
                                    <label htmlFor="username" className="floatLabel">User Name</label>
                                    <input id="username" name="username" type="text" onChange={handleChange} value={userInfo.username} />
                                    {/* <span>user name is not avalibale</span> */}
                                </div>
                                <div className='mWmubF'>
                                    <label htmlFor="firstname" className="floatLabel">First Name</label>
                                    <input id="firstname" name="first_name" type="text" onChange={handleChange} value={userInfo.first_name} />
                                </div>
                                <div className='mWmubF'>
                                    <label htmlFor="lastname" className="floatLabel">Last Name</label>
                                    <input id="lastname" name="last_name" type="text" onChange={handleChange} value={userInfo.last_name} />
                                </div>
                                <div className='mWmubF'>
                                    <label htmlFor="Email" className="floatLabel">Email</label>
                                    <input id="Email" name="email" type="text" onChange={handleChange} value={userInfo.email} />
                                    {/* <span>email format is wrong !</span> */}
                                </div>
                                <div className='mWmubF pb-1'>
                                    <button type="submit">Change Profile !</button>
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