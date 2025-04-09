import styles from './AdvantagesBlock.module.css'
import './AdvantagesBlock.css'
import { useRef } from 'react';
import axios from 'axios';


const response = axios.get('https://free-e-store-api.onrender.com/api/v1/products');

console.log(response);

export default function AdvantagesBlock({ title, descr, position }) {

    const advantagesRef = useRef([])

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add(styles.active);
                observer.unobserve(entry.target);
            }
        });
    });

    const addToRef = (el) => {
        if (el && !advantagesRef.current.includes(el)) {
            advantagesRef.current.push(el)
            observer.observe(el)
        }
    }

    return (
        <>
            <div ref={addToRef} className={`${styles.advantages__block} ${position}`}>
                <div className={styles.advantages__number}></div>
                <div className={styles.advantages__info}>
                    <div className={styles.advantages__title}>{title}</div>
                    <div className={styles.advantages__descr}>{descr}</div>
                </div>
            </div >
        </>
    )
}
