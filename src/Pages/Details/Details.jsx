import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './details.css'
import NotFound from '../NotFound/NotFound'
import Loading from '../../images/200.gif'
import DetailBlog from '../../Components/Details/DetailBlog';
import useAxios from '../../Hooks/useAxios';
import Token from '../../Functions/Token';
import axios from 'axios';


const Details = () => {
    const { id, location } = useParams();
    const [post, setPost] = useState()
    const [loading, setLoading] = useState(true)

    const { user } = Token()

    const api = useAxios()

    async function getPost() {
        if (!user) return await axios.get(`/posts/explore/${id}`);
        else return await api.get(`/posts/${location}/${id}`)
    }

    useEffect(() => {
        const get = async () => {
            await getPost()
                .then(res => {
                    setPost(res.data)
                    setLoading(false)
                })
                .catch(() => {
                    setLoading(false)
                    setPost(false)
                })
        }
        get()
    }, [id])

    return (
        <>
            {loading ? <div className="loading_holder"><div><img src={Loading} alt="" /></div></div> : post ?
                <div className='details'>
                    <div className="container">
                        <DetailBlog post={post} />
                    </div>
                    <ToastContainer />
                </div>
                : <NotFound value='Blog' />
            }
        </>
    );
};

export default Details;