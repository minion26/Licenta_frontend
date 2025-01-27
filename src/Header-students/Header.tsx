import styles from './Header.module.css';
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
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

    const lastVisitedSemester = localStorage.getItem('semesterNumber');
    const lastVisitedIdCourses = localStorage.getItem('lastVisitedIdCourses');
    const navigate = useNavigate();

    return (
    <div className="nav flex-column">
        <div className={styles.burger} onClick={toggleMenu}>
            <div className={styles.burgerDiv}></div>
            <div className={styles.burgerDiv}></div>
            <div className={styles.burgerDiv}></div>
        </div>
        <header className={`${styles.header} ${showMenu ? `${styles.headerShow}` : ''}`} onClick={toggleMenu}>
            <h1 className={styles.webApp} onClick={() => navigate("/main-page-student")}>web app</h1>

            <nav>
                <ul className={`${styles.headerUlLi} ${styles.headerUlLiA}`}>
                    <Link to="/my-profile" className={styles.headerUlLiA}>
                        <li className={`${styles.headerUlLi}`}><FaUser/>My profile</li>
                    </Link>

                    <Link to={`/semester/${lastVisitedSemester}`} className={styles.headerUlLiA}>
                        <li className={`${styles.headerUlLi}`}><FaBookOpen/>Courses</li>
                    </Link>

                    <Link to={`/lecture-per-course/${lastVisitedIdCourses}`} className={styles.headerUlLiA}>
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