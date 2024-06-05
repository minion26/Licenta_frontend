import styles from "./Header.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import {FaBookOpen, FaUser} from 'react-icons/fa';
import {RiPagesFill} from "react-icons/ri";
import {PiExamFill} from "react-icons/pi";
import {IoNotificationsSharp} from "react-icons/io5";
function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    console.log("Burger icon clicked"); // Add this line
    setShowMenu(!showMenu);
  };

  const lastVisitedId = localStorage.getItem('lastVisitedId');

  return (
    <div>
      <div className={styles.burger} onClick={toggleMenu}>
        <div className={styles.burgerDiv}></div>
        <div className={styles.burgerDiv}></div>
        <div className={styles.burgerDiv}></div>
      </div>
      <header
        className={`${styles.header} ${showMenu ? `${styles.headerShow}` : ""}`}
        onClick={toggleMenu}
      >
        <h1 className={styles.webApp}>web app</h1>
        <nav>
          <ul className={`${styles.headerUlLi} ${styles.headerUlLiA}`}>
            <Link to="/my-profile" className={styles.headerUlLiA}>
              <li className={`${styles.headerUlLi}`}><FaUser/> My profile</li>
            </Link>

            <li className={`${styles.headerUlLi} ${styles.headerUlLiA}`}>
              <Link to={"/main-page-teacher"} className={styles.headerUlLiA}>
                <FaBookOpen/> Courses
              </Link>
            </li>

            <li className={`${styles.headerUlLi} ${styles.headerUlLiA}`}>
              <Link to={`/lecture-per-course/${lastVisitedId}`} className={styles.headerUlLiA}>
                <RiPagesFill/> Lectures
              </Link>
            </li>

            <li className={`${styles.headerUlLi} ${styles.headerUlLiA}`}>
              <Link to={`/see-tests/${lastVisitedId}`} className={styles.headerUlLiA}>
                <PiExamFill/> Tests
              </Link>
            </li>

              <Link to="/notifications-teacher" className={styles.headerUlLiA}>
                <li className={`${styles.headerUlLi} `}><IoNotificationsSharp/> Notices</li>
              </Link>
          </ul>
        </nav>
      </header>
    </div>
);
}

export default Header;
