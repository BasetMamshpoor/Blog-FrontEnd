import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import userlogo from '../../images/Ei-user.svg'
import Token from '../../Functions/Token';
import axios from 'axios';
import { toast } from 'react-toastify'
import Loading from '../../images/200.gif'
import style from './Follow.module.css'

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
                    <Link to={`/user/${i.user}`} >
                        <div className={style.followImgProf}>
                            <img src={userlogo} alt="" />
                        </div>
                        <span>{i.user}</span>
                    </Link>
                </li>
            )
        } else {
            return (
                <li key={i.id}>
                    <Link to={`/user/${i.following_user_id}`} >
                        <div className={style.followImgProf}>
                            <img src={userlogo} alt="" />
                        </div>
                        <span>{i.following_user_id}</span>
                    </Link>
                </li>
            )
        }
    }) : <p>There is no user to show!</p>

    return (
        <div className="container">
            <div className={style.wXFr}>
                {loading ? <img src={Loading} alt="" style={{ width: '200px', height: '200px', objectFit: 'cover', }} /> :
                    <div className={style.lGop}>
                        <header className={style.Bfou}>
                            <p>{params}</p>
                            <button onClick={() => navigate(-1)}>X</button>
                        </header>
                        <ul className={style.FollowList} onScroll={handleScroll}>
                            {list}
                        </ul>
                    </div>}
            </div>
        </div>
    );
};

export default Follow;