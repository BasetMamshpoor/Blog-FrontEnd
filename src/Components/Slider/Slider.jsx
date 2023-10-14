import React, { useState } from "react";
import './Slider.css'

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
        <div className='each-slide' key={item.id}>
            <img src={item.image} alt="" />
        </div>
    ));

    const renderDots = () => images.map((silde, index) => ( // check index
        <li
            className={isActive(index) + ' dots'}
            key={silde.id}>
            <button onClick={() => setActive(index)}>
            </button>
        </li>
    ));

    const renderArrows = () => (
        <>
            <button
                type='button'
                className={`arrows prev ${active > 0 ? '' : 'disabledel'} `}
                onClick={prevOne} >
                <svg fill='#000' viewBox='0 0 24 24'>
                    <path d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z' />
                    <path d='M0 0h24v24H0z' fill='none' />
                </svg>
            </button>
            <button
                type='button'
                className={`arrows next ${active < max - 1 ? '' : 'disabledel'} `}
                onClick={nextOne} >
                <svg fill='#000' viewBox='0 0 24 24' >
                    <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' />
                    <path d='M0 0h24v24H0z' fill='none' />
                </svg>
            </button>
        </>
    )

    return (
        <section className='slider'>
            {images.length > 1 && <>
                <div
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    className='wrapper'
                    style={setSliderStyles()}>
                    {renderSlides()}
                </div>
                {renderArrows()}
                <ul className='dots-container'>
                    {renderDots()}
                </ul>
            </>}
            {images.length > 0 && images.length < 2 &&
                <>
                    <div className='wrapper'>
                        <div className='each-slide'>
                            <img src={images[0].image} alt="" />
                        </div>
                    </div>
                </>
            }
        </section >
    );
};

export default React.memo(Slider)










