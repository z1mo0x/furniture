import styles from './AdvantagesBlock.module.css'
import './AdvantagesBlock.css'

export default function AdvantagesBlock({ title, descr, position }) {




    console.log(advantages);


    return (
        <>
            <div className={`${styles.advantages__block} ${position}`}>
                <div className={styles.advantages__number}></div>
                <div className={styles.advantages__info}>
                    <div className={styles.advantages__title}>{title}</div>
                    <div className={styles.advantages__descr}>{descr}</div>
                </div>
            </div >
        </>
    )
}
