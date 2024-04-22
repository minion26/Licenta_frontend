import styles from './Header.module.css';
import {useState} from "react";
import { Link } from 'react-router-dom';

interface HeaderProps {
    showButton: boolean;
}
function Header({showButton}: HeaderProps) {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        console.log('Burger icon clicked'); // Add this line
        setShowMenu(!showMenu);
    };

    return (
        <div className="nav flex-column">
            <div className={styles.burger} onClick={toggleMenu}>
                <div className={styles.burgerDiv}></div>
                <div className={styles.burgerDiv}></div>
                <div className={styles.burgerDiv}></div>
            </div>
            <header className={`${styles.header} ${showMenu ? `${styles.headerShow}` : ''}`} onClick={toggleMenu}>
                <h1 className={styles.webApp}>web app</h1>
                {showButton &&
                    <Link to="/login">
                        <button type="button" className="btn btn-light">Login</button>
                    </Link>
                }

            </header>
        </div>
    );
}

export default Header;