import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';
import userlogo from '../../images/Ei-user.svg'
import Cookies from 'js-cookie';
import Loading from '../../images/200.gif'
import style from './User.module.css';

const User = ({ isMe, isExist, username }) => {
    const axios = useAxios()
    const navigate = useNavigate()

    const [user, setUser] = useState({})
    const [render, setRender] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getUser = async () => {
            await axios.get(`accounts/users/${username}`)
                .then(({ data }) => {
                    const { post_set, ...userData } = data;
                    setLoading(false)
                    setUser(userData)
                    isExist(true)
                }).catch(() => {
                    setLoading(false)
                    setUser({})
                    isExist(false)
                })
        }
        getUser()
    }, [render, username])

    async function request() {
        if (user.status_follow) return await axios.delete(`/accounts/following/${user.status_follow}`);
        else return await axios.post('/accounts/following/', { "following_user_id": user.username })
    }

    const handleFollow = async () => await request().then(() => setRender(Math.random()))

    const handleLogout = () => {
        Cookies.remove('authTokens')
        navigate('/explore')
    }

    return (
        <>
            <div className={style.EzonU}>
                <div className={style.prVk}>
                    {loading ? <div style={{ width: '200px', height: '200px', margin: '0 auto' }}><img src={Loading} alt="" /></div> :
                        <>
                            <div className={style.gCte}>
                                <div className={style.nmU}>
                                    {user.profile_photo ?
                                        <img src={user.profile_photo} alt="" />
                                        :
                                        <img src={userlogo} alt="" />
                                    }
                                </div>
                                <h3>{user.username}</h3>
                            </div>
                            <div className={style.mUyf}>
                                <Link to={`/user/${username}/followers`} className={style.mgVj}>
                                    <span>{user.followers}</span>
                                    <p>Followers</p>
                                </Link>
                                <Link to={`/user/${username}/following`} className={style.mgVj}>
                                    <span>{user.following}</span>
                                    <p>Following</p>
                                </Link>
                            </div>
                            <div className={style.gBqr}>
                                <ul>
                                    {user.first_name && <li><span>FirstName :</span> {user.first_name}</li>}
                                    {user.last_name && <li><span>LastName :</span> {user.last_name}</li>}
                                    {user.email && <li><span>Email :</span> {user.email}</li>}
                                </ul>
                            </div>
                            <div className={style.bOOb}>
                                {
                                    isMe ?
                                        <>
                                            <Link to={`/edit-profile`} state={user}>Edit Profile</Link>
                                            <button onClick={handleLogout}>Log out</button>
                                        </>
                                        :
                                        <>
                                            <button onClick={handleFollow}>{user.status_follow ? 'unFollow' : 'follow'}</button>
                                            <button disabled>message</button>
                                        </>
                                }
                            </div>
                        </>}
                </div>
            </div>
        </>
    );
};

export default User;