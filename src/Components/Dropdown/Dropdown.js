import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';
import style from './Dropdown.module.css'

const Dropdown = ({ state, setBlogs }) => {
    const { id } = state
    const drop = useRef()
    const axios = useAxios()
    const navigate = useNavigate()

    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
        window.addEventListener("click", handler);
        return () => window.removeEventListener("click", handler);
    }, []);

    const handler = () =>  setShowMenu(false)
    const handleInputClick = (e) => {
        e.stopPropagation()
        setShowMenu(!showMenu)
    };

    return (
        <div className={style.dropdown_container} >
            <section ref={drop} onClick={handleInputClick} className={style.dropdown_input}>
                <svg viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                </svg>
            </section>
            {showMenu && (
                <div className={style.dropdown_menu}>
                    <ul className={style.dropdown_item_group} dir="auto">
                        {setBlogs ?
                            <li className={style.dropdown_item} onClick={() => axios.delete(`posts/post/${id}`)
                                .then(() => setBlogs(prev => prev.filter(b => b.id !== id)))}>DELETE</li> :
                            <li className={style.dropdown_item}
                                onClick={() => axios.delete(`posts/post/${id}`)
                                    .then(() => navigate(-1))}>DELETE</li>}

                        <li className={style.dropdown_item}><Link to='/blog-option/' state={state}>EDIT</Link></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;