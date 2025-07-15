
import styles from './Header.module.css'
import HeaderActions from './HeaderActions/HeaderActions';
import Nav from './Nav/Nav';
import { Link } from "react-router-dom";

const links = [
    {
        title: 'Home',
        link: '/'
    },
    {
        title: 'About',
        link: '/about'
    },
    {
        title: 'Collection',
        link: '/collection'
    },
]

export default function Header() {
    return (
        <>
            <header className={styles.header}>
                <div className="container">
                    <div className={styles.header__wrapper}>
                        <Link to="/" className={styles.header__logo}>Furniutr.</Link>
                        <Nav links={links} />
                        <HeaderActions />
                    </div>
                </div>
            </header >
        </>
    )
}
