import React, { useRef } from 'react';
import style from './MultipleImage.module.css'


const MultipleImage = ({ setBlogInfo }) => {
    const wrapper = useRef()

    const handleMultipleImage = e => {
        const imgArray = [];
        const fileArry = wrapper.current
        for (const file of e.target.files) {
            imgArray.push(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('load', function () {
                let html = `
                <div class=${style.upload__img_box} data-file='${file.name}'>
                    <img src='${this.result}' />
                    <div class=${style.upload__img_close}></div>
                </div>`;
                fileArry.innerHTML += html
            })
        }
        setBlogInfo(prev => {
            return {
                ...prev,
                uplouded_images: [...prev.uplouded_images, ...imgArray]
            }
        })
    }

    return (
        <>
            <div className={style.form_group}>
                <div className={style.upload__box}>
                    <div className={style.upload__btn_box}>
                        <label className={style.upload__btn}>
                            <p>Upload images</p>
                            <input onChange={handleMultipleImage} type="file" multiple className={style.upload__inputfile} accept='image/jpeg, image/jpg, image/png, image/gif, image/webp' hidden />
                        </label>
                    </div>
                    <div className={style.upload__img_wrap} ref={wrapper}></div>
                </div>
            </div>
        </>
    );
};

export default MultipleImage;