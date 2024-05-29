import styles from "./Header-admin.module.css";
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
          {/*<Tooltip title={"Navigate to main page"}>*/}
          <Link to={"/main-page-admin"}>
            <h1 className={styles.webApp}>web app</h1>
          </Link>
          {/*</Tooltip>*/}
        <nav>
          <ul className={`${styles.headerUlLi} ${styles.headerUlLiA}`}>
            <Link to="/my-profile" className={styles.headerUlLiA}>
              <li className={`${styles.headerUlLi}`}>My profile</li>
            </Link>

            {/*<Link to={"/students"} className={styles.headerUlLiA}>*/}
            {/*  <li className={`${styles.headerUlLi}`}>Students</li>*/}
            {/*</Link>*/}

            {/*<Link to={"/teachers"} className={styles.headerUlLiA}>*/}
            {/*  <li className={`${styles.headerUlLi} `}>Teachers</li>*/}
            {/*</Link>*/}

            {/*<Link to={"/admin"} className={styles.headerUlLiA}>*/}
            {/*  <li className={`${styles.headerUlLi} `}>Admin</li>*/}
            {/*</Link>*/}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
