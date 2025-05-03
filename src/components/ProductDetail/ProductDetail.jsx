import Title from '../Title/Title'
import styles from './ProductDetail.module.css'

export default function ProductDetail({ image, title, price, description, rating }) {
    return (
        <div className={styles.detail}>
            <div className="container">
                <div className={styles.detail__wrapper}>
                    <div className={styles.detail__image}>
                        <img src={image} alt="" />
                    </div>
                    <div className={styles.detail__info}>
                        <div className={styles.detail__title}>
                            {title}
                        </div>
                        <div className={styles.detail__descr}>{description}</div>
                    </div>
                    <div className={styles.detail__block}>
                        <div className={styles.detail__price}>{price} $</div>
                        <div className={styles.detail__rating}>
                            <div className={styles.detail__stars}>

                            </div>
                            {rating.rate}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
