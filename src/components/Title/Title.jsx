import React from 'react'
import styles from './Title.module.css'

export default function Title({ children }) {
    return (
        <span className={styles.title}>{children}</span>
    )
}
