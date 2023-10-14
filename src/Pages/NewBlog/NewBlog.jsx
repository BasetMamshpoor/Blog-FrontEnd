import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import Token from '../../Functions/Token';
import BlogForm from '../../Components/NewBlog/BlogForm';
import style from './NewBlog.module.css'


const NewBlog = () => {
    const defaultData = { title: '', body: '', uplouded_images: [], status: 'PU', images: [] }
    const { state } = useLocation();
    const [blogInfo, setBlogInfo] = useState(defaultData)
    const { authTokens: token } = Token()
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!token) navigate('/login')
    }, [token, location])

    useEffect(() => {
        if (state) {
            const { images, ...newState } = state
            setBlogInfo({ ...blogInfo, ...newState })
        } else setBlogInfo(defaultData)
    }, [state, location])

    useEffect(() => {
        window.addEventListener('click', handleRemove)
        return () => window.removeEventListener('click', handleRemove)
    }, [blogInfo.uplouded_images])

    function handleRemove(e) {
        if (e.target.className === 'upload__img-close') {
            const el = e.target.parentElement
            const file = el.getAttribute('data-file')
            for (const i of blogInfo.uplouded_images) {
                if (i.name === file) {
                    setBlogInfo(prev => {
                        prev.uplouded_images.splice(i, 1)
                        return { ...prev }
                    })
                    break;
                }
            }
            el.remove();
        }
    }

    return (
        <>
            <div className={style.wQio}>
                <div className={style.tab_pane} id="post-object-form">
                    <BlogForm blogInfo={blogInfo} state={state} setBlogInfo={setBlogInfo} />
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default NewBlog;