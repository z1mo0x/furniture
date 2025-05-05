import React from 'react'
import { useState } from 'react'
import heroImage from '../../img/hero-image.png'
import styles from './Hero.module.css'
import ButtonRed from '../Buttons/ButtonRed/ButtonRed'
import ButtonVideo from '../Buttons/ButtonVideo/ButtonVideo'
import video from '../../img/video.mp4'
import PopupVideo from '../PopupVideo/PopupVideo'

export default function Hero({ title, subtitle, link, linkText }) {

    const [isVideoOpen, setIsVideoOpen] = useState(false)

    function openVideo() {
        if (isVideoOpen) {
            setIsVideoOpen(false)
        }
        else {
            setIsVideoOpen(true)
        }
        console.log(isVideoOpen);
    }

    return (
        <>
            <div className={styles.hero}>
                <div className={`container ${styles.hero__container}`} >
                    <div className={styles.hero__wrapper}>
                        <div className={styles.hero__info}>
                            <div className={styles.hero__subtitle}>{subtitle}</div>
                            <div className={styles.hero__title}>
                                {title}
                            </div>
                            <div className={styles.hero__actions}>
                                <ButtonRed to={'/happybirthday/'}>{linkText}</ButtonRed>
                                <ButtonVideo openVideo={openVideo}></ButtonVideo>
                            </div>
                            <PopupVideo isVideoOpen={isVideoOpen} openVideo={openVideo} videoPopup={video} />
                        </div>
                        <div className={styles.hero__image}>
                            <img src={heroImage} alt="" />
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}
