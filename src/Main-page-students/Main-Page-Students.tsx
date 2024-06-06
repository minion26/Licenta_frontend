import Header from "../Header-students/Header.tsx";
import styles from "./Main-Page-Students.module.css";
import MyCalendar from "../Calendar/Calendar.tsx";
import { Link } from "react-router-dom";

function MainPageStudents() {
  return (
      <div>
        <Header/>
        <div className={styles.imageContainer}>
          <img
              className={` ${styles.imageContainerFirstChild} ${styles.imageContainerImg}`}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ47orxmpkHY1A5dj64-yt3zwkEQ_7jnJf34ISaVB2SLA&s"
              alt="Descriere prima imagine"/>
          <h1 className={`${styles.newsreader} ${styles.imageContainerTitle} ${styles.title}`}>Fii student
            la <em>FII</em>.</h1>
          <img
              className={` ${styles.imageContainerLastChild} ${styles.imageContainerImg}`}
              src="data:image/jpeg;base64,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"
              alt="Descriere a doua imagine"/>
        </div>
        <div className={styles.main}>
          <div className={styles.buttons}>

            <Link to="/semester/1">
              <button
                  type="button"
                  className={`btn btn-outline-primary ${styles.btn}`}
                  data-mdb-ripple-init
                  data-mdb-ripple-color="dark"
              >
                Semester 1
              </button>
            </Link>

            <Link to="/semester/2">
              <button
                  type="button"
                  className={`btn btn-outline-primary ${styles.btn}`}
                  data-mdb-ripple-init
                  data-mdb-ripple-color="dark"
              >
                Semester 2
              </button>
            </Link>

          </div>
          <div className={styles.calendarContainer}>
            <div className={styles.calendar}>
              <MyCalendar/>
            </div>
          </div>
        </div>
      </div>
  );
}

export default MainPageStudents;
