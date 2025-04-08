import React from "react";
import styles from './About.module.css'
import ButtonRed from "../Buttons/ButtonRed/ButtonRed";
import aboutImage from '../../img/about-image.png'
import Title from "../Title/Title";


export default function About({ text }) {
    return (
        <>
            <div className={styles.about}>
                <div className="container">
                    <div className={styles.about__wrapper}>
                        <div className={styles.about__image}>
                            <img src={aboutImage} alt="" />
                        </div>
                        <div className={styles.about__info}>
                            <div className={styles.about__title}>
                                About
                                <Title>Furniture</Title>
                            </div>
                            <div className={styles.about__descr}>
                                <p>
                                    People have been using natural objects, such as tree
                                    stumps, rocks and moss, as furniture since the beginning of human civilisation.
                                </p>
                                <p>
                                    {text}
                                </p>
                            </div>
                            {location.pathname !== '/about' ?
                                <ButtonRed to={'/about'} classes={styles.about__button}>Read more</ButtonRed>
                                :
                                undefined
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
