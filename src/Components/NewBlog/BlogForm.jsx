import React, { useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import MultipleImage from './MultipleImage';
import ImageOption from './ImageOption';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import style from './BlogForm.module.css'

const validate = (obj) => {
    const error = {}
    if (!obj.title.trim()) {
        error.title = 'title can not be empty'
    } else {
        delete error.title
    }
    if (!obj.body.trim()) {
        error.body = 'body can not be empty'
    } else {
        delete error.body
    }
    return error;
}

const BlogForm = ({ blogInfo, state, setBlogInfo }) => {
    const [touch, setTouch] = useState({ title: false, body: false })
    const error = validate(blogInfo)
    const axios = useAxios()
    const navigate = useNavigate();

    const handleChange = event => {
        setBlogInfo(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }
    const handleSendData = async (e) => {
        e.preventDefault();
        if (Object.keys(error).length > 0) {
            setTouch({ title: true, body: true })
        } else {
            let formdata = new FormData();
            formdata.append("title", blogInfo.title);
            formdata.append("body", blogInfo.body);
            formdata.append("status", blogInfo.status);

            for (const img of blogInfo.uplouded_images) {
                formdata.append("uplouded_images", img);
            }
            await axios.post('/posts/post/', formdata,
                { headers: { 'Content-Type': 'multipart/form-data', } })
                .then(() => navigate('/'))
                .catch(() => toast.error('you have a blog with same title please change title!'))
        }
    }
    const handleEditPost = async (e) => {
        e.preventDefault();
        if (Object.keys(error).length > 0) {
            setTouch({ title: true, body: true })
        } else {
            let formdata = new FormData();
            formdata.append("title", blogInfo.title);
            formdata.append("body", blogInfo.body);
            formdata.append("status", blogInfo.status);

            for (const img of blogInfo.uplouded_images) {
                formdata.append("uplouded_images", img);
            }

            if (blogInfo.images.length > 0) {
                formdata.append('image_option', blogInfo.images)
            }

            await axios.put(`/posts/post/${state.id}/`, formdata,
                { headers: { 'Content-Type': 'multipart/form-data', } })
                .then(() => navigate(-1))
                .catch(() => toast.error('something went wrong!'))
        }
    }
    return (
        <>
            <form encType='multipart/form-data' onSubmit={state ? handleEditPost : handleSendData}>
                <div className={style.form_group}>
                    <label className={style.control_label}>Title</label>
                    <input dir='auto' name="title" className={style.form_control} type="text" value={blogInfo.title} onChange={handleChange} />
                    {touch.title && error.title && <span>{error.title}</span>}
                </div>
                <div className={style.form_group}>
                    <label className={style.control_label}>Body</label>
                    <textarea dir='auto' name="body" value={blogInfo.body} onChange={handleChange} className={style.form_control}></textarea>
                    {touch.body && error.body && <span>{error.body}</span>}
                </div>
                <ImageOption state={state?.images} setBlogInfo={setBlogInfo} />
                <MultipleImage setBlogInfo={setBlogInfo} />

                <div className={style.form_actions}>
                    <button type='submit' className={style.js_tooltip}>{state ? 'EDIT' : 'POST'}</button>
                    <button type="button" className={style.closeModal} onClick={() => navigate(-1)}>CANCLE</button>
                </div>
            </form>
        </>
    );
};

export default BlogForm;