import React from 'react';
import style from './ImageOption.module.css'


const ImageOption = ({ state, setBlogInfo }) => {

    const handleImageOption = (e) => {
        const name = parseInt(e.target.name)
        setBlogInfo(prev => {
            const { images } = prev
            if (!images.includes(name)) {
                images.push(name);
            } else {
                images.splice(images.indexOf(name), 1);
            }
            return { ...prev }
        })
    }
    return (
        <>
            {state && state.length > 0 &&
                <div className={style.form_group}>
                    <label className={style.control_label}>Select the Image to delete!</label>
                    <div className={style.OvrcU}>
                        {
                            state.map(i => {
                                return (
                                    <div key={i.id} className={style.ExBt_2}>
                                        <input
                                            type="checkbox"
                                            name={i.id}
                                            id={`image${i.id}`}
                                            hidden
                                            onChange={handleImageOption}
                                        />
                                        <label htmlFor={`image${i.id}`} className={style.image_holder}>
                                            <img src={i.image} alt="imagePost" />
                                        </label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }

        </>
    );
};

export default ImageOption;