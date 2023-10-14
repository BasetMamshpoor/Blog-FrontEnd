import React, { useEffect, useState } from 'react';
import Blog from '../Blog/Blog';
import Loading from '../../images/200.gif'
import useAxios from '../../Hooks/useAxios';
import Token from '../../Functions/Token';
import { toast } from 'react-toastify';
import style from './UserPosts.module.css';


const UserPosts = ({ isMe, username }) => {
    const { user: token } = Token()

    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [isFollow, setIsFollow] = useState(false)
    const [end, setEnd] = useState(false)

    const axios = useAxios()

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    useEffect(() => {
        if (token) {
            const findUser = async () => {
                await axios.get(`accounts/users/${username}`)
                    .then(({ data }) => {
                        setIsFollow(data.status_follow)
                        setLoading(false)
                        setBlogs(data.post_set)
                        if (data.post_set.length < 1) setEnd(true)
                        else setEnd(false)
                    }).catch(() => {
                        setLoading(false)
                    })
            }
            findUser();
        }
    }, [username])

    useEffect(() => {
        if (isFetching && blogs && !end) {
            fetchMoreListItems();
        }
    }, [isFetching, blogs]);

    function handleScroll() {
        if ((document.scrollingElement.scrollHeight - window.innerHeight) <= (document.documentElement.scrollTop.toFixed())) {
            setIsFetching(true);
        }
    }

    async function fetchMoreListItems() {
        const params = { page: Math.ceil(blogs.length / 5) + 1 }

        await axios.get(`/accounts/users/${username}`, { params })
            .then(({ data }) => {
                if (data.post_set.length < 1) setEnd(true)
                else setEnd(false)
                setBlogs(prev => prev.concat(data.post_set))
                setIsFetching(false)
            }).catch(() => toast.error('sorry something went wrong!'))
    }

    const Blogs = blogs && blogs.map(item => {
        if (isMe) {
            return (
                <Blog
                    key={item.id}
                    data={item}
                    setBlogs={setBlogs}
                    link={false}
                    from='post'
                />
            )
        } else {
            return (
                <Blog
                    key={item.id}
                    from={isFollow ? 'post' : 'explore'}
                    data={item}
                    link={false}
                />
            )
        }
    })

    return (
        <>
            {loading ?
                <div style={{ width: '200px', height: '200px', margin: '0 auto' }}><img src={Loading} alt="" /></div>:
                <div>
                    <div className={style.gBcymj}>
                        {Blogs.length ? Blogs : <p className={style.noPost}>You're not posted any blog yet!</p>}
                    </div>
                    {isFetching && !end && <div className='loading'><img src={Loading} alt='loading' /></div>}
                </div>
            }
        </>
    );
};

export default React.memo(UserPosts);