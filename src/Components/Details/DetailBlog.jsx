import React from 'react';
import userlogo from '../../images/Ei-user.svg'
import { Link, useNavigate } from 'react-router-dom';
import Comment from '../Comments/Comment.jsx'
import Like from '../Like';
import useAxios from '../../Hooks/useAxios';
import Slider from '../Slider/Slider'
import style from './DetailBlog.module.css'
import Token from '../../Functions/Token';
import Dropdown from '../Dropdown/Dropdown';

const DetailBlog = ({ post }) => {
    const { title, body, status, id, images, profile, author, created, updated, status_like, like } = post

    const { user } = Token()


    const axios = useAxios()

    return (
        <>
            <section className={style.main_content}>
                <div className={`${style.main_gallery_wrapper} ${style.flex_container}`}>
                    <div className={`${style.card_wrapper} ${style.flex_container}`}>
                        <div className={style.card_header}>
                            <div className={`${style.header_img_container} ${style.flex_container}`}>
                                {profile ?
                                    <img className={style.card_header_img} src={profile} alt='author' />
                                    :
                                    <img className={style.card_header_img} src={userlogo} alt='author' />
                                }
                            </div>
                            {<Link className={style.card_title} to={`/user/${author}`}>{author}</Link>}
                            {
                                user?.username === author &&
                                // <div className={style.phWxoR}>
                                //     <input type="checkbox" id={`optionBlog${id}`} hidden />
                                //     <label htmlFor={`optionBlog${id}`} className={style.XsPzoY}>
                                //         <svg viewBox="0 0 16 16">
                                //             <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                //         </svg>
                                //     </label>
                                //     <div className={style.jWcoI}>
                                //         <ul>
                                //             <li onClick={() => axios.delete(`posts/post/${id}`).then(() => navigate(-1))}>DELETE</li>
                                //             <li><Link to='/Blog-Option/' state={{title, body, status, id, images}}>EDIT</Link></li>
                                //         </ul>
                                //     </div>
                                // </div>
                                <Dropdown state={{title, body, status, id, images}}  />
                            }
                        </div>
                        <div className={style.card_img_container}>
                            <Slider images={images} />
                        </div>
                        <div className={style.card_data}>
                            <p dir='auto' className={style.title}>{title}</p>
                            <div className={style.Kbyci}>
                                <p dir='auto'>{body}</p>
                            </div>
                            <div className={style.post_acions}>
                                <Like id={id} status_like={status_like} like={like} />
                            </div>
                        </div>
                        <div className={style.blogFooter}>
                            <span>{created.slice(0, 4) + ' / ' + created.slice(4, 6) + ' / ' + created.slice(6, 8)}</span>
                            <div>
                                {created !== updated && <span className={style.edited}>edited</span>}
                            </div>
                        </div>
                    </div>
                </div>
                <Comment id={post.id} />
            </section>
        </>
    );
};

export default DetailBlog;