import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, } from 'react-router-dom';
import Token from '../../Functions/Token';
import UserNotFound from '../NotFound/UserNotFound'
import User from '../../Components/Profile/User';
import UserPosts from '../../Components/Profile/UserPosts';


const UserProfile = () => {
    const { user: token } = Token()
    const navigate = useNavigate()
    const [user, setUser] = useState()
    const { user: username } = useParams()
    const isMe = (token?.username === username) ? true : false

    useEffect(() => {
        setUser(true)
    }, [username])


    useEffect(() => {
        if (token === null) navigate('/login');
    }, [token, username])

    return (
        <>
            <div className='container'>
                {user ?
                    <div className='grid gap-8 md:grid-cols-2 grid-cols-1 md:m-0 -m-12'>
                        <>
                            <User username={username} isMe={isMe} isExist={setUser} />


                            <UserPosts isMe={isMe} username={username} />
                        </>
                    </div>
                    : <UserNotFound value={username} />
                }
            </div>
        </>
    );
};

export default UserProfile;