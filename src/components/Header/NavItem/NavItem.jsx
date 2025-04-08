import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './NavItem.module.css'




export default function NavItem({ link, title }) {
    return (
        <>
            <Link to={link} className={`${styles.nav__item} ${location.pathname === link ? styles.nav__active : ''}`}>{title}</Link>
        </>
    )
}
