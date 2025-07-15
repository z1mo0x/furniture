import { Link } from 'react-router'
import styles from './ButtonRed.module.css'

export default function ButtonRed({ props, onClick, classes, children, to }) {
    return (
        <Link to={to} className={`${styles.button} ${classes}`} onClick={onClick} {...props}> {children}</Link >
    )
}
