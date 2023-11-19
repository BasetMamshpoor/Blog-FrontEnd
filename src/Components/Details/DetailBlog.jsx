import React from 'react';
import userlogo from '../../images/Ei-user.svg'
import { Link } from 'react-router-dom';
import Comment from '../Comments/Comment.jsx'
import Like from '../Like';
import Slider from '../Slider/Slider'
import style from './DetailBlog.module.css'
import Token from '../../Functions/Token';
import Dropdown from '../Dropdown/Dropdown';

const DetailBlog = ({ post }) => {
    const { title, body, status, id, images, profile, author, created, updated, status_like, like } = post

    const { user } = Token()

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