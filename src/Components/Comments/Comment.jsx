import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import loading from '../../images/200.gif'
import Token from '../../Functions/Token';
import style from './Comments.module.css'
import useAxios from '../../Hooks/useAxios';
import { toast } from 'react-toastify';
import axios from 'axios';
import Input from '../Input'

const Comment = ({ id }) => {
    const { user } = Token()
    const [Comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [count, setCount] = useState(0)
    const [render, setRender] = useState(0)
    const [isFetching, setIsFetching] = useState(false)
    const [end, setEnd] = useState(false)

    const api = useAxios()

    useEffect(() => {
        const get = async () => {
            await axios.get(`/posts/comment/${id}/post_id`)
                .then(({ data }) => {
                    setComments(data.results)
                    setCount(data.count)
                    if (data.next === null) setEnd(true)
                    else setEnd(false)
                }).catch(() => toast.error('sorry something went wrong!'))
        }
        get()
    }, [render])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    useEffect(() => {
        if (isFetching && Comments && !end) {
            fetchMoreListItems();
        }
    }, [isFetching, Comments, end]);

    async function fetchMoreListItems() {
        const params = { offset: Comments.length }
        await axios.get(`/posts/comment/${id}/post_id`, { params })
            .then(({ data }) => {
                setComments(prev => prev.concat(data.results))
                if (data.next === null) setEnd(true)
                setIsFetching(false)
            }).catch(() => toast.error('sorry something went wrong!'))
    }

    function handleScroll() {
        if ((document.scrollingElement.scrollHeight - window.innerHeight) <= (document.documentElement.scrollTop.toFixed())) {
            setIsFetching(true);
        }
    }

    const sendComment = async (e) => {
        e.preventDefault()
        if (!user) toast.error('Please Login first!')
        else if (comment.trim()) {
            await api.post('posts/comment/', { 'body': comment, 'post': id })
                .then(() => {
                    setRender(Math.random())
                    setComment('')
                }).catch(() => toast.error('sorry something went wrong!'))
        }
    }

    const handleDeleteComment = (id) => {
        api.delete(`posts/comment/${id}`)
            .then(() => setComments(prev => prev.filter(i => i.id != id)))
    }

    const comments = Comments.length ? Comments.map(c => {
        return (
            <div className={style.comment} key={c.id}>
                <div className={style.headerC}>
                    <Link to={`/user/${c.owner}`}>{c.owner}</Link>
                </div>
                <div className={style.bodyC}>
                    <p>{c.body}</p>
                </div>
                <div className={style.csxop}>
                    <span>{c.created.slice(0, 4) + ' / ' + c.created.slice(4, 6) + ' / ' + c.created.slice(6, 8)}</span>
                    -
                    <span>{c.created.slice(8, 10) + ' : ' + c.created.slice(10, 12)}</span>
                </div>
                {c.owner === user?.username && <button className={style.DelComment} onClick={() => handleDeleteComment(c.id)}>Del</button>}
            </div>
        )
    }) : null

    return (
        <>
            <div className={style.postComment}>
                <h5>comments - {count}</h5>
                <div className={style.commentForm}>
                    <form>
                        <Input type="text" value={comment} name='comment' result={(name, value) => setComment(value)} />
                        <button type='button' onClick={sendComment}>Send</button>
                    </form>
                </div>
                <div className={style.commentList}>
                    {comments}
                </div>
                {isFetching && !end && <div className={style.loadingComment}><img src={loading} alt='loading' /></div>}
            </div>
        </>
    );
};

export default Comment;