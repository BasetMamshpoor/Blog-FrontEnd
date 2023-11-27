import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';
import userlogo from '../../images/Ei-user.svg'
import Cookies from 'js-cookie';
import Loading from '../../images/200.gif'

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
            <div className='max-w-md w-full my-0 mx-auto'>
                <div className='sticky top-32 z-50 flex items-center flex-wrap p-4 rounded-10 border shadow-md'>
                    {loading ? <div className='w-[200px] h-[200px] my-0 mx-auto'><img src={Loading} alt="" /></div> :
                        <>
                            <div className='flex flex-col items-center flex-grow w-full xs:w-1/2'>
                                <div className='w-24 h-24 rounded-full overflow-hidden'>
                                    {user.profile_photo ?
                                        <img src={user.profile_photo} alt="" />
                                        :
                                        <img src={userlogo} alt="" />
                                    }
                                </div>
                                <h3 className='mt-6 tracking-wide text-lg'>{user.username}</h3>
                            </div>
                            <div className='my-4 mx-auto flex items-center justify-center w-full xs:w-1/2 gap-4'>
                                <Link to={`/user/${username}/followers`} className='flex flex-col items-center'>
                                    <span className='font-semibold text-sm'>{user.followers}</span>
                                    <p className='mt-1 font-medium'>Followers</p>
                                </Link>
                                <Link to={`/user/${username}/following`} className='flex flex-col items-center'>
                                    <span className='font-semibold text-sm'>{user.following}</span>
                                    <p className='mt-1 font-medium'>Following</p>
                                </Link>
                            </div>
                            <div className='my-4 flex-grow w-full'>
                                <ul className='flex-col'>
                                    {user.first_name && <li className='my-1 text-sm tracking-wider w-full'><span className='font-black tracking-wider capitalize mr-2 '>FirstName :</span> {user.first_name}</li>}
                                    {user.last_name && <li className='my-1 text-sm tracking-wider w-full'><span className='font-black tracking-wider capitalize mr-2 '>LastName :</span> {user.last_name}</li>}
                                    {user.email && <li className='my-1 text-sm tracking-wider w-full'><span className='font-black tracking-wider capitalize mr-2 '>Email :</span> {user.email}</li>}
                                </ul>
                            </div>
                            <div className='flex items-center justify-center w-full mx-auto mb-4 gap-4'>
                                {
                                    isMe ?
                                        <>
                                            <Link className='transition-cus outline-none bg-transparent border text-black py-1 px-2 tracking-wider rounded-md cursor-pointer hover:text-white hover:bg-gray-400' to={`/edit-profile`} state={user}>Edit Profile</Link>
                                            <button className='transition-cus outline-none bg-transparent border text-black py-1 px-2 tracking-wider rounded-md cursor-pointer hover:text-white hover:bg-gray-400' onClick={handleLogout}>Log out</button>
                                        </>
                                        :
                                        <>
                                            <button className='transition-cus outline-none bg-transparent border text-black py-1 px-2 tracking-wider rounded-md cursor-pointer hover:text-white hover:bg-gray-400' onClick={handleFollow}>{user.status_follow ? 'unFollow' : 'follow'}</button>
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