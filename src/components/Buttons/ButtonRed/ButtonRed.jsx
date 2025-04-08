import { Link } from 'react-router'
import styles from './ButtonRed.module.css'

export default function ButtonRed({ props, classes, children, to }) {
    return (
        <Link to={to} className={`${styles.button} ${classes}`}  {...props}> {children}</Link >
    )
}
