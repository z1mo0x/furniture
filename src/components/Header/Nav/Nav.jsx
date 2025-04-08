import { Link, NavLink } from 'react-router'
import styles from './Nav.module.css'
import NavItem from '../NavItem/NavItem'
import { useEffect, useState } from 'react'




export default function Nav({ links }) {


    const [windowSize, setWindowSize] = useState({
        width: window.screen.width
    })

    useEffect(() => {

        const handleResize = () => {
            setWindowSize({
                width: window.screen.width
            })
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const [isBurgerOpen, setIsBurgerOpen] = useState(false)

    function burgerOpen() {
        if (isBurgerOpen) {
            setIsBurgerOpen(false)
        }
        else {
            setIsBurgerOpen(true)
        }
    }


    return (
        <>
            {
                windowSize.width < 768 ?
                    <>
                        <button onClick={burgerOpen} className={`${styles.nav__burger} ${isBurgerOpen ? styles.active : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <nav className={`${styles.nav} ${styles.nav__mobile} ${isBurgerOpen ? styles.active : ''}`}>
                            {links.map((el, index) => {
                                return (
                                    <>
                                        <NavItem key={index} link={el.link} title={el.title} />
                                    </>
                                )
                            })}
                        </nav >
                    </>
                    :
                    <nav className={`${styles.nav}`}>
                        {links.map((el, index) => {
                            return <NavItem key={index} link={el.link} title={el.title} />
                        })}
                    </nav >
            }
            {/* <nav className={`${styles.nav}`}>
                {links.map((el, index) => {
                    return <NavItem key={index} link={el.link} title={el.title} />
                })}
            </nav > */}

        </>
    )
}
