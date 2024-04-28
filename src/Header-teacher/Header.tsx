import styles from "./Header.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    console.log("Burger icon clicked"); // Add this line
    setShowMenu(!showMenu);
  };

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
            <Link to="/my-profile">
              <li className={`${styles.headerUlLi} ${styles.headerUlLiA}`}>
                My profile
              </li>
            </Link>

            <li className={`${styles.headerUlLi} ${styles.headerUlLiA}`}>
              <a className={styles.headerUlLiA} href="/">
                Courses
              </a>
            </li>
            <li className={`${styles.headerUlLi} ${styles.headerUlLiA}`}>
              <a className={styles.headerUlLiA} href="/">
                Lectures
              </a>
            </li>
            <li className={`${styles.headerUlLi} ${styles.headerUlLiA}`}>
              <a className={styles.headerUlLiA} href="/">
                Tests
              </a>
            </li>

            <Link to="/notifications-teacher">
              <li className={`${styles.headerUlLi} ${styles.headerUlLiA}`}>
                Notifications
              </li>
            </Link>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
