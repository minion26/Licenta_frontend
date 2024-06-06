import styles from './Header.module.css';
import {useState} from "react";
import {Link} from "react-router-dom";
import {FaBookOpen, FaUser} from "react-icons/fa";
import {RiPagesFill} from "react-icons/ri";
import {PiExamFill} from "react-icons/pi";
import {MdSchool} from "react-icons/md";

function Header() {
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
            <nav>
                <ul className={`${styles.headerUlLi} ${styles.headerUlLiA}`}>
                    <Link to="/my-profile" className={styles.headerUlLiA}>
                        <li className={`${styles.headerUlLi}`}><FaUser/>My profile</li>
                    </Link>

                    <Link to="/courses" className={styles.headerUlLiA}>
                        <li className={`${styles.headerUlLi}`}><FaBookOpen/>Courses</li>
                    </Link>

                    <Link to="/lectures" className={styles.headerUlLiA}>
                        <li className={`${styles.headerUlLi}`}><RiPagesFill/>Lectures</li>
                    </Link>

                    <Link to="/homework" className={styles.headerUlLiA}>
                        <li className={`${styles.headerUlLi}`}><MdSchool />Homework</li>
                    </Link>

                    <Link to="/tests" className={styles.headerUlLiA}>
                        <li className={`${styles.headerUlLi}`}><PiExamFill/> Tests</li>
                    </Link>
                </ul>
            </nav>
        </header>
    </div>
)
    ;
}

export default Header;