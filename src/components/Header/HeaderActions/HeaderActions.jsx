import { Link } from 'react-router'
import styles from './HeaderAction.module.css'

import cartIcon from '../../../img/card-icon.png'
import searchIcon from '../../../img/search-icon.svg'

export default function HeaderActions() {
    return (
        <div className={`${styles.icons}`}>
            <Link to={'/basket'} className={styles.icons__item}>
                <img src={cartIcon} alt="" />
            </Link>
            <div className={styles.icons__item}>
                <img src={searchIcon} alt="" />
            </div>
        </div>
    )
}
