import React from 'react'
import styles from './Advantages.module.css'
import Title from '../Title/Title'
import advantagesBg from '../../img/advantages-bg.png'
import advantagesDots from '../../img/advantages-dots.png'
import AdvantagesBlock from './AdvantagesBlock/AdvantagesBlock'


const list = [
    {
        title: 'Full services',
        descr: 'Provide the best service and very fast response.',
        position: 'left'
    },
    {
        title: 'Long warranty.',
        descr: 'With a 5-year warranty provided, providing satisfying service.',
        position: 'top-right'
    },
    {
        title: 'Modern design',
        descr: 'The room looks beautiful with a blend of contemporary and attractive design.',
        position: 'bottom-right'
    },
]

export default function Advantages() {
    return (
        <>
            <div className={styles.advantages}>
                <div className="container">
                    <div className={styles.advantages__title}>
                        More value from this
                        <Title>Furniture</Title>
                    </div>
                    <div className={styles.advantages__background}>
                        <img className={styles.advantages__bg} src={advantagesBg} />
                        <img className={styles.advantages__dots} src={advantagesDots} />
                        <div className={styles.advantages__wrapper}>
                            {list.map((el, index) => {
                                return <AdvantagesBlock key={index} title={el.title} descr={el.descr} position={el.position} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
