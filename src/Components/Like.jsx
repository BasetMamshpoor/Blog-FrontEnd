import React, { useEffect, useState } from 'react';
import notify from '../Auth/toast'
import useAxios from '../Hooks/useAxios';

const Like = ({ id, status_like, like }) => {
    const [liked, setLiked] = useState(null)
    const [countLike, setCountLike] = useState(0)

    const axios = useAxios()

    useEffect(() => {
        setCountLike(like)
        setLiked(status_like)
    }, [])

    const handleLike = () => {
        if (typeof liked == "number") {
            if (liked > 0) {
                axios.delete(`posts/like/${liked}/`)
                    .then(() => {
                        setCountLike(prev => prev - 1)
                        setLiked(0)
                    }).catch(() => notify('error', 'please Login !'))
            } else {
                axios.post(`posts/like/`, { "post": id })
                    .then(res => {
                        setCountLike(prev => prev + 1)
                        setLiked(res.data.id)
                    }).catch(() => notify('error', 'please Login !'))
            }
        } else {
            if (liked) {
                setCountLike(prev => prev - 1)
                setLiked(false)
            } else {
                setCountLike(prev => prev + 1)
                setLiked(true)
            }
        }
    }
    return (
        <>
            <div className='Like_post'>
                <span onClick={handleLike}>
                    {liked ?
                        <svg className='liked' viewBox="0 0 16 16">
                            <path fillRule='red' d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg>
                        :
                        <svg className='disliked' viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                        </svg>
                    }
                </span>
                <span>{countLike} Likes</span>
            </div>
        </>
    );
};

export default React.memo(Like);