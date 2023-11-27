import React, { useState } from "react";
import style from './Slider.module.css'

const Slider = ({ images }) => {
    const [active, setActive] = useState(0);
    const [touchPosition, setTouchPosition] = useState(null)
    const max = images.length;

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e) => {
        const touchDown = touchPosition

        if (touchDown === null) {
            return
        }

        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch

        if (diff > 5) {
            nextOne()
        }

        if (diff < -5) {
            prevOne()
        }

        setTouchPosition(null)
    }

    const nextOne = () => active < max - 1 && setActive(active + 1);

    const prevOne = () => active > 0 && setActive(active - 1);

    const isActive = value => active === value && 'active'

    const setSliderStyles = () => {
        const transition = active * - (100 / images.length);

        return {
            width: (images.length * 100) + '%',
            transform: 'translateX(' + transition + '%)'
        }
    }

    const renderSlides = () => images.map(item => (
        <div className='w-full h-96' key={item.id}>
            <img className="object-contain" src={item.image} alt="" />
        </div>
    ));

    const renderDots = () => images.map((silde, index) => ( // check index
        <li
            className={(!!isActive(index) ? isActive(index) : '') + ' inline-block p-1'}
            key={silde.id}>
            <button onClick={() => setActive(index)} className={`${!!isActive(index) ? 'bg-cyan-500' : 'bg-gray-200'} rounded-full w-[10px] h-[10px]`}>
            </button>
        </li>
    ));

    const renderArrows = () => (
        <>
            <button
                type='button'
                className={`${style.arrows} left-1 hover:opacity-70 hover:left-0 ${active > 0 ? 'flex' : 'display-none'}`}
                onClick={prevOne} >
                <svg fill='#000' viewBox='0 0 24 24'>
                    <path d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z' />
                    <path d='M0 0h24v24H0z' fill='none' />
                </svg>
            </button>
            <button
                type='button'
                className={`${style.arrows} right-1 hover:right-0 hover:opacity-70 ${active < max - 1 ? '' : 'disabledel'}`}
                onClick={nextOne} >
                <svg fill='#000' viewBox='0 0 24 24' >
                    <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' />
                    <path d='M0 0h24v24H0z' fill='none' />
                </svg>
            </button>
        </>
    )

    return (
        <section className='slider my-1 w-full h-full overflow-hidden relative'>
            {images.length > 1 && <>
                <div
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    className='border-b border-slate-400 flex items-center transition-cus will-change-transform'
                    style={setSliderStyles()}>
                    {renderSlides()}
                </div>
                {renderArrows()}
                <ul className='h-auto absolute w-auto text-center left-1/2 bottom-2 translate-x-[-50%] z-10'>
                    {renderDots()}
                </ul>
            </>}
            {images.length > 0 && images.length < 2 &&
                <>
                    <div className='border-b border-slate-400 flex items-center transition-cus will-change-transform'>
                        <div className='w-full h-96'>
                            <img src={images[0].image} alt="" />
                        </div>
                    </div>
                </>
            }
        </section >
    );
};

export default React.memo(Slider)










