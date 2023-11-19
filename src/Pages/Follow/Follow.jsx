import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import userlogo from '../../images/Ei-user.svg'
import Token from '../../Functions/Token';
import axios from 'axios';
import { toast } from 'react-toastify'
import Loading from '../../images/200.gif'

const Follow = () => {
    const navigate = useNavigate();
    const { follow: params } = useParams()
    const [follow, setFollow] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [end, setEnd] = useState(false)
    const [loading, setLoading] = useState(true)
    const location = useLocation()

    const { user } = Token()

    useEffect(() => {
        const get = async () => {
            await axios.get(`/accounts/following/${user.user_id}/${params}`)
                .then(({ data }) => {
                    setLoading(false)
                    setFollow(data.results)
                    if (data.next === null) setEnd(!end)
                }).catch(() => {
                    toast.error('sorry something went wrong!')
                    setLoading(false)
                })
        }
        get()
    }, [location])

    useEffect(() => {
        if (isFetching && follow && !end) {
            fetchMoreListItems();
        }
    }, [isFetching, follow, end]);

    function handleScroll({ target }) {
        if (target.scrollHeight - target.offsetHeight <= (target.scrollTop + 1)) {
            setIsFetching(true)
        }
    }

    async function fetchMoreListItems() {
        await axios.get(`/accounts/following/${user.user_id}/${params}`, { params: { offset: follow.length } })
            .then(({ data }) => {
                if (data.next === null) setEnd(true)
                setFollow(prev => prev.concat(data.results))
                setIsFetching(false)
            }).catch(() => {
                toast.error('sorry something went wrong!')
            })
    }

    const list = follow.length ? follow.map(i => {
        if (params === 'followers') {
            return (
                <li key={i.id}>
                    <Link to={`/user/${i.user}`} className='tracking-wide text-xl py-2 px-0 border-t border-gray-100 flex items-center'>
                        <div className='shrink-0 overflow-hidden rounded-full w-20 h-20'>
                            <img src={userlogo} alt="" />
                        </div>
                        <span className='ml-4 flex-grow'>{i.user}</span>
                    </Link>
                </li>
            )
        } else {
            return (
                <li key={i.id}>
                    <Link to={`/user/${i.following_user_id}`} className='tracking-wide text-xl py-2 px-0 border-t border-gray-100 flex items-center'>
                        <div className='shrink-0 overflow-hidden rounded-full w-20 h-20'>
                            <img src={userlogo} alt="" />
                        </div>
                        <span className='ml-4 flex-grow'>{i.following_user_id}</span>
                    </Link>
                </li>
            )
        }
    }) : <p>There is no user to show!</p>

    return (
        <div className="container">
            <div className='z-[100] fixed w-full h-full top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-gray-50'>
                {loading ? <img src={Loading} alt="" className='w-[200px] h-[200px]' /> :
                    <div className='bg-white max-w-md w-full rounded-10 overflow-hidden'>
                        <header className='py-4 px-3 flex items-center bg-white'>
                            <p className='capitalize tracking-wide text-xl m-0 text-center flex-grow'>{params}</p>
                            <button className='cursor-pointer text-2xl my-0 mx-2 border-none bg-none' onClick={() => navigate(-1)}>X</button>
                        </header>
                        <ul className='m-0 p-4 pr-0 max-h-[30rem] overflow-y-auto flex-col' onScroll={handleScroll}>
                            {list}
                        </ul>
                    </div>}
            </div>
        </div>
    );
};

export default Follow;